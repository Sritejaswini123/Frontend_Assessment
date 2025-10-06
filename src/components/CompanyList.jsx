import React, { useEffect, useState } from "react";
import CompanyCard from "./CompanyCard";
import FilterBar from "./FilterBar";

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    useEffect(() => {
        fetch("/companies.json")
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch company data");
                return res.json();
            })
            .then((data) => setCompanies(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading)
        return <p className="text-center mt-10 text-gray-600">Loading...</p>;
    if (error)
        return <p className="text-center mt-10 text-red-500">{error}</p>;

    const cities = [...new Set(companies.map((c) => c.location || c.city))];
    const filteredCompanies = companies.filter((company) => {
        const matchesSearch = company.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
        const matchesCity =
            !selectedCity ||
            (company.location || company.city).toLowerCase() ===
            selectedCity.toLowerCase();
        return matchesSearch && matchesCity;
    });

    const totalPages = Math.ceil(filteredCompanies.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const currentCompanies = filteredCompanies.slice(
        startIndex,
        startIndex + pageSize
    );

    const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
    const handleNext = () =>
        currentPage < totalPages && setCurrentPage(currentPage + 1);

    return (
        <div className="bg-gray-800 min-h-screen flex flex-col">
            <div className="container mx-auto px-12 py-10 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                    <h1 className="text-2xl font-bold text-white">Company List</h1>
                    <FilterBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        selectedCity={selectedCity}
                        setSelectedCity={setSelectedCity}
                        cities={cities}
                    />
                </div>

                {currentCompanies.length > 0 ? (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {currentCompanies.map((company) => (
                                <CompanyCard key={company.id} company={company} />
                            ))}
                        </div>
                        <div className="flex items-center justify-between mt-8">
                            <p className="text-gray-400">
                                Showing {currentCompanies.length} of{" "}
                                {filteredCompanies.length}  companies
                            </p>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={handlePrev}
                                    disabled={currentPage === 1}
                                    className="px-3 py-1 bg-gray-700 text-gray-200 rounded disabled:opacity-50"
                                >
                                    &lt;
                                </button>
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                        key={index + 1}
                                        onClick={() => setCurrentPage(index + 1)}
                                        className={`px-3 py-1 rounded ${currentPage === index + 1
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                            }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    onClick={handleNext}
                                    disabled={currentPage === totalPages}
                                    className="px-3 py-1 bg-gray-700 text-gray-200 rounded disabled:opacity-50"
                                >
                                    &gt;
                                </button>
                            </div>
                            <div>
                                <select
                                    value={pageSize}
                                    onChange={(e) => {
                                        setPageSize(Number(e.target.value));
                                        setCurrentPage(1);
                                    }}
                                    className="bg-gray-700 text-gray-200 px-3 py-1 rounded"
                                >
                                    <option value={8}>Show 8</option>
                                    <option value={12}>Show 12</option>
                                    <option value={20}>Show 20</option>
                                </select>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-1 items-center justify-center">
                        <div className="flex flex-col items-center">
                            <img
                                src="https://previews.123rf.com/images/derin30/derin302306/derin30230600026/205850481-no-data-found-illustration-for-sites-banner-design-vector-illustration.jpg"
                                alt="No data found"
                                className="w-64 h-64 object-contain mb-4 opacity-90"
                            />
                            <p className="text-center text-gray-400 text-lg font-medium">
                                No companies found.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompanyList;
