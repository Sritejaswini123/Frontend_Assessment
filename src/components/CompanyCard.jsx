// CompanyCard.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const CompanyCard = ({ company }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSeeMore = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate(`/company/${company.id}`);
        }, 1000);
    };

    return (
        <div className="bg-gray-900 text-white shadow-lg rounded-lg overflow-hidden max-w-xs hover:shadow-xl transition-shadow">
            <img
                src={company.logo_url}
                alt={company.name}
                className="w-full h-40 object-contain p-4"
            />
            <div className="p-5 flex flex-col items-center">
                <h2 className="text-lg font-bold mb-2">{company.name}</h2>
                <p className="text-gray-500 mb-0">{company.industry}</p>
                <p className="text-gray-300 text-sm mb-4">{company.city}</p>

                <a
                    href={company.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded mb-2 hover:bg-blue-700 transition-colors text-sm w-full text-center"
                >
                    Visit Website
                </a>

                <button
                    className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors text-sm w-full text-center relative"
                    onClick={handleSeeMore}
                    disabled={loading}
                >
                    {loading ? (
                        <div className="flex items-center justify-center">
                            <div className="w-5 h-5 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                            <span className="ml-2 text-sm">Loading...</span>
                        </div>
                    ) : (
                        "See More"
                    )}
                </button>
            </div>
        </div>
    );
};

export default CompanyCard;
