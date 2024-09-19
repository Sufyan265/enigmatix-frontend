import React, { useState, useEffect } from 'react';

const ViewReports = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        const fetchReports = async () => {
            const response = await fetch('/api/reports');
            const data = await response.json();
            setReports(data);
        };

        fetchReports();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Reports</h1>
            <ul>
                {reports.map(report => (
                    <li key={report.id} className="mb-4">
                        <span>{report.title}: {report.description}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewReports;
