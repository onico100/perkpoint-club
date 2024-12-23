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

    // Create the response with CORS headers
    const response = NextResponse.json(benefits, { status: 200 });
    response.headers.set("Access-Control-Allow-Origin", "*"); // Allow all origins, or replace '*' with a specific domain
    response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  } catch (error) {
    console.error("Error fetching benefits:", error);
    const response = NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type");

    return response;
  }
}

// Handle the OPTIONS request for preflight checks
export async function OPTIONS() {
  const response = NextResponse.json(null, { status: 204 }); // No Content
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");

  return response;
}
