import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../services/mongo";

type Branch = {
  branchName: string;
  address: string;
};

type Benefit = {
  _id: string;
  suppliername: string;
  clubId: string;
  redemptionConditions: string;
  description: string;
  expirationDate: string;
  branches: Branch[];
  isActive: boolean;
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const clubId = searchParams.get("clubId");

  if (!clubId) {
    return NextResponse.json({ error: "Missing clubId" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("fake-benefits-clubs");
    const collection = db.collection<Benefit>("perkpoint_benefits");

    // Find all benefits for the given clubId
    const benefits = await collection.find({ clubId }).toArray();

    // Return benefits as JSON
    return NextResponse.json(benefits, { status: 200 });
  } catch (error) {
    console.error("Error fetching benefits:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
