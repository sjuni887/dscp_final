// src/components/PowerBIReport.js
import React from 'react';

const PowerBIReport = () => {
    const powerBiUrl = "https://app.powerbi.com/reportEmbed?reportId=adc0be8b-a4b0-4ec5-8fa9-ac0491135efa&autoAuth=true&ctid=cba9e115-3016-4462-a1ab-a565cba0cdf1";

    return (
        <div>
            <iframe
                title="Power BI Report"
                width="100%"
                height="600"
                src={powerBiUrl}
                frameBorder="0"
                allowFullScreen="true"
            ></iframe>
        </div>
    );
};

export default PowerBIReport;
