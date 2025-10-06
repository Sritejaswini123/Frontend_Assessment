import React from "react";

const FilterBar = ({ searchTerm, setSearchTerm, selectedCity, setSelectedCity, cities }) => {
    return (
        <div className="flex justify-end mb-6 gap-4">
            <input
                type="text"
                placeholder="Search by company name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-600 bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 w-60"
            />
            <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="px-4 py-2 rounded-lg border border-gray-600 bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
                <option value="">All Cities</option>
                {cities.map((city, index) => (
                    <option key={index} value={city}>
                        {city}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default FilterBar;
