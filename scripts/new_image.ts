import { prisma } from "../lib/prisma";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function main() {
  // Step 1: Cloudinary se saari images fetch karo
  console.log("Fetching all images from Cloudinary...");
  
  const allResources: any[] = [];
  let nextCursor: string | undefined;

  do {
    const result: any = await cloudinary.api.resources({
      type: "upload",
      prefix: "academyfind/institutes/",
      max_results: 500,
      next_cursor: nextCursor,
    });

    allResources.push(...result.resources);
    nextCursor = result.next_cursor;
    console.log(`Fetched ${allResources.length} so far...`);
  } while (nextCursor);

  console.log(`Total Cloudinary images: ${allResources.length}`);

  // Step 2: Map banao — inst-{id} → secure_url
  // public_id hoga: "academyfind/institutes/inst-cmpz9emxe00004oifulxutpen"
  const urlMap = new Map<string, string>();
  for (const resource of allResources) {
    // public_id se inst id nikalo
    const publicId = resource.public_id; 
    // "academyfind/institutes/inst-cmpz9emxe00004oifulxutpen"
    const instId = publicId.replace("academyfind/institutes/inst-", "");
    urlMap.set(instId, resource.secure_url);
  }

  console.log(`URL map ready with ${urlMap.size} entries`);

  // Step 3: DB mein jo googleapis.com URL hain unhe fix karo
  const institutes = await prisma.institute.findMany({
    where: {
      OR: [
        { imageUrl: { contains: "googleapis.com" } },
        { imageUrl: null },
        { imageUrl: "" }
      ]
    },
    select: { id: true, name: true },
  });

  console.log(`Institutes to fix: ${institutes.length}`);

  let fixed = 0;
  let notFound = 0;

  for (const inst of institutes) {
    const cloudinaryUrl = urlMap.get(inst.id);

    if (cloudinaryUrl) {
      await prisma.institute.update({
        where: { id: inst.id },
        data: { imageUrl: cloudinaryUrl },
      });
      console.log(`✅ Fixed: ${inst.name}`);
      fixed++;
    } else {
      console.warn(`⚠️ No Cloudinary image found for: ${inst.name} (${inst.id})`);
      notFound++;
    }
  }

  console.log(`\n🎉 Done! Fixed: ${fixed} | Not found on Cloudinary: ${notFound}`);
}

main()
  .catch(console.error)
  .finally(async () => prisma.$disconnect());