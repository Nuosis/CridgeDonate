

async function updateRecord(token, params, layout, recordID) {
    console.log("FileMaker_updateRecord called")
    // Prepare the data for the API call
    const payloadData = {
        method: "editRecord",
        server: "server.selectjanitorial.com",
        database: "clarityData",
        layout,
        recordID,
        params: params
    };

    try {
        const response = await fetch('https://server.claritybusinesssolutions.ca:4343/clarityData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(payloadData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseData = await response.json();

        // Check if the response indicates success
        if (responseData.messages && responseData.messages[0].code === "0") {
            console.log("Record updated successfully", responseData.response);
            return responseData
        } else {
            throw new Error(`Failed to create record: ${responseData.messages[0].message}`);
        }
    } catch (error) {
        console.error("Error creating account: ", error.message);
        throw error; // Rethrow the error to be handled by the caller
    }
}



export { updateRecord };
