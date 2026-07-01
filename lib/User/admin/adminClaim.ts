"use server"

import { prisma } from "../../prisma"
import { revalidatePath } from "next/cache"
import {
    CLAIM_APPROVED_STATUS,
    CLAIM_REJECTED_STATUS,
    validateClaimTransition,
} from "@/lib/institutes/institute-workflow"

export async function getInstituteClaims () {
    try{
        const claims = await prisma.instituteClaim.findMany({
            include:{
                user:{select:{name:true,email:true,phone:true}},
                institute:{select:{name:true,address:true,phone:true}}
            },
            orderBy:{createdAt:"desc"}
        })
        return {success: true, data: claims}
    }catch(err){
        console.error("Error fetching claims:", err)
        return {success:false,error: "Failed to fetch claims"}
    }
}

export async function updateClaimStatus(claimId: string, status: "APPROVED" | "REJECTED"){
    try {
        const claim = await prisma.instituteClaim.findUnique({
            where:{id: claimId},
            include: { user: true, institute: true }
        })

        if(!claim){
            return { success: false, error: "Claim not found", statusCode: 404 }
        }

        const transition = validateClaimTransition(claim.status, status)
        if(!transition.success){
            return transition
        }

        if(status === "REJECTED"){
            await prisma.instituteClaim.update({
                where:{id:claimId},
                data:{status: CLAIM_REJECTED_STATUS}
            })
        }

        if(status === "APPROVED"){
            await prisma.$transaction([
                prisma.instituteClaim.update({
                    where: {id: claimId},
                    data:{status: CLAIM_APPROVED_STATUS}
                }),

                prisma.user.update({
                    where:{id:claim.userId},
                    data: {role: "INSTITUTE_MANAGER"}
                }),

                prisma.instituteManager.upsert({
                    where:{
                        userId_instituteId:{
                            userId:claim.userId,
                            instituteId:claim.instituteId
                        }
                    },
                    update:{},
                    create:{
                        userId:claim.userId,
                        instituteId:claim.instituteId
                    }
                })
            ])
        }
        revalidatePath("/af-ass-manage/claims")
        revalidatePath("/af-ass-manage")
        revalidatePath("/profile")
        revalidatePath("/institute/[idSlug]")
        return { success: true, message: `Claim ${status.toLowerCase()} successfully!` }
    }catch(err){
        console.error("Error fetching claims:", err)
        return { success: false, error: "Something went wrong" }    }
}