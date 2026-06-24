    import { meili } from "@/lib/meilisearch";
import { revalidatePath } from "next/dist/server/web/spec-extension/revalidate";

export async function removeGhostInstitute(instituteId: string) {
   try {
       // Dhyan rakhna, tumhari sync script mein ID "institute_clxyz..." format mein save hoti hai
       await meili.index('global_search').deleteDocument(`institute_${instituteId}`);
       console.log("Successfully deleted from Meilisearch!");
       revalidatePath(`/institute/${instituteId}-crack-ed`);
       revalidatePath('/af-ass-manage/institutes');
       return { success: true };
   } catch (error) {
       console.error("Error:", error);
   }
}

removeGhostInstitute("cmqqytz2e000004jmkcox7epu")
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });