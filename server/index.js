const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

// Endpoint to search for Facebook groups
app.get('/searchGroups', async (req, res) => {
    try {
        const { longitude, latitude, miles } = req.query;
        const accessToken = 'YOUR_FACEBOOK_ACCESS_TOKEN';
        
        // Make a request to Facebook Graph API to search for groups
        const response = await axios.get(`https://graph.facebook.com/v12.0/search?q=community&type=group&center=${latitude},${longitude}&distance=${miles}&access_token=${accessToken}`);
        
        // Filter the groups based on criteria (e.g., minimum members, privacy settings)
        const filteredGroups = response.data.data.filter(group => {
            return group.member_count > 1000 && group.privacy === 'CLOSED' && !group.description.includes('business') && !group.description.includes('buy/sell');
        });

        res.json(filteredGroups);
    } catch (error) {
        console.error('Error searching for groups:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
