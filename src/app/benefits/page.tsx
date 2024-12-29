"use client";

import { useEffect, useState } from "react";

type Branch = {
  nameBranch: string;
  city: string;
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

const BenefitsPage: React.FC = () => {
  const [benefits, setBenefits] = useState<Benefit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBenefits = async () => {
      try {
        const clubId = "67691d34e49ae94f97d1828d"; // Replace with dynamic clubId if needed
        const response = await fetch(`/api/benefits?clubId=${clubId}`);
        if (!response.ok) {
          throw new Error(`Error fetching benefits: ${response.statusText}`);
        }
        const data: Benefit[] = await response.json();
        setBenefits(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBenefits();
  }, []);

  if (loading) {
    return <p>Loading benefits...</p>;
  }

  if (error) {
    return <p style={{ color: "red" }}>Error: {error}</p>;
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ fontSize: "2rem", color: "#333" }}>Benefits</h1>
      {benefits.length === 0 ? (
        <p>No benefits found for this club.</p>
      ) : (
        <div>
          {benefits.map((benefit) => (
            <div
              key={benefit._id}
              style={{
                border: "1px solid #ccc",
                padding: "1rem",
                marginBottom: "1rem",
                borderRadius: "8px",
              }}
            >
              <h2 style={{ margin: "0 0 1rem 0" }}>{benefit.suppliername}</h2>
              <p>
                <strong>Description:</strong> {benefit.description}
              </p>
              <p>
                <strong>Redemption Conditions:</strong>{" "}
                {benefit.redemptionConditions}
              </p>
              <p>
                <strong>Expiration Date:</strong>{" "}
                {new Date(benefit.expirationDate).toLocaleDateString()}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {benefit.isActive ? "Active" : "Inactive"}
              </p>
              <h4>Branches</h4>
              <ul>
                {benefit.branches.map((branch, index) => (
                  <li key={index}>
                    <strong>{branch.nameBranch}</strong>: {branch.city}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default BenefitsPage;
