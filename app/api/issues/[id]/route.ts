import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { IssueFormSchema } from "../../../ValidationSchema";

export async function PATCH(request:NextRequest,{params}:{params:{id:string}}){
const body = await request.json();
const validation = IssueFormSchema.safeParse(body)

if(!validation.success){
    return NextResponse.json(validation.error.format(), {status:400})
}
const issue = await prisma.issue.findUnique({
    where:{id:params.id}
})

if(!issue){
    return NextResponse.json({error:"No issue found"}, {status:400}) 
}
const Updatedissue = await prisma.issue.update({
    where:{id:issue.id},
    data:{
        title:body.title,
        description:body.description,
    }
})
return NextResponse.json(Updatedissue, {status:201})
}


export async function DELETE(request:NextRequest,{params}:{params:{id:string}}){
    const issue = await prisma.issue.findUnique({
        where:{id:params.id}
    })
    
    if(!issue){
        return NextResponse.json({error:"No issue found"}, {status:404}) 
    }

    await prisma.issue.delete({
        where:{id:issue.id}
    })
    return NextResponse.json({}, {status:200}) 
}