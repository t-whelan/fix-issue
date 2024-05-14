import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { IssueFormSchema } from "../../../ValidationSchema";
import { auth } from "@/auth";
export async function POST(request:NextRequest){
    const session = await auth();

    if(!session?.user){
        return NextResponse.json({message:"Logged user can only create the issue"}, {status:400}) 
    }
const body = await request.json();
const validation = IssueFormSchema.safeParse(body)

if(!validation.success){
    return NextResponse.json(validation.error.format(), {status:400})
}

const issue = await prisma.issue.create({
    data:{
        title:body.title,
        description:body.description,
    }
})
return NextResponse.json(issue, {status:201})
}