"use client";

import React from "react";

const HomePage: React.FC = () => {
  return (
    <main
      style={{
        padding: "2rem",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
      }}
    >
      <h1 style={{ fontSize: "2rem", color: "#333" }}>
        Welcome to the Fake Club Site
      </h1>
      <p>
        This is a demo site I created to showcase how to fetch benefits data
        from a custom API route. The API fetches data from a MongoDB collection
        and serves it based on a given club ID.
      </p>
      <p>
        The site demonstrates my ability to:
        <ul>
          <li>Build a backend using the Next.js App Router</li>
          <li>Integrate a MongoDB database</li>
          <li>Fetch and display data dynamically on the frontend</li>
        </ul>
      </p>

      <h2>Explore More</h2>
      <p>
        You can check out the source code and see this project running live:
      </p>
      <ul>
        <li>
          <a
            href="https://github.com/onico100/perk-point"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0070f3", textDecoration: "underline" }}
          >
            GitHub Project
          </a>
        </li>
        <li>
          <a
            href="https://perk-point.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0070f3", textDecoration: "underline" }}
          >
            Live Site
          </a>
        </li>
      </ul>

      <h2>Try the Benefits Fetch</h2>
      <p>
        You can explore the benefits data fetched from the API by going to the
        <a
          href="/benefits"
          style={{
            color: "#0070f3",
            textDecoration: "underline",
            marginLeft: "5px",
          }}
        >
          Benefits Page
        </a>
        .
      </p>
    </main>
  );
};

export default HomePage;
