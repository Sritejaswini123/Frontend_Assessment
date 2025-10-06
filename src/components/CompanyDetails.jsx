// CompanyDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const CompanyDetails = () => {
    const { id } = useParams();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("/companies.json")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch company data");
                return res.json();
            })
            .then((data) => {
                const found = data.find((item) => item.id === Number(id));
                if (!found) throw new Error("Company not found");
                setCompany(found);
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading)
        return <p className="text-center mt-10 text-gray-400">Loading...</p>;
    if (error)
        return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center p-6 py-26">
            <div className="max-w-md w-full bg-gray-800 p-6 rounded-lg shadow-lg">
                <img
                    src={company.logo_url}
                    alt={company.name}
                    className="w-full h-48 object-contain mb-4"
                />
                <h2 className="text-2xl font-bold mb-2 text-center">{company.name}</h2>
                <p className="text-gray-400 text-center mb-4">{company.industry}</p>

                <div className="space-y-2 text-sm">
                    <p>
                        <span className="font-semibold">Email:</span> {company.email}
                    </p>
                    <p>
                        <span className="font-semibold">Phone:</span> {company.phone}
                    </p>
                    <p>
                        <span className="font-semibold">Address:</span> {company.address},{" "}
                        {company.city}, {company.country}
                    </p>
                    <p>
                        <span className="font-semibold">Created At:</span>{" "}
                        {new Date(company.created_at).toLocaleString()}
                    </p>
                </div>

                <div className="flex flex-col mt-6">
                    <a
                        href={company.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 text-white px-4 py-2 rounded mb-3 text-center hover:bg-blue-700 transition-colors"
                    >
                        Visit Website
                    </a>

                    <Link
                        to="/"
                        className="bg-gray-700 text-white px-4 py-2 rounded text-center hover:bg-gray-600 transition-colors"
                    >
                        ← Back to List
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CompanyDetails;
