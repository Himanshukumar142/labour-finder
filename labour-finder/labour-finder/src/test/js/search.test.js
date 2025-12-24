// Simple test for SearchManager
const SearchManager = require('../../main/resources/js/search.js');

const mockLabours = [
    { name: 'John', role: 'Electrician', location: { city: 'Mumbai' } },
    { name: 'Smith', role: 'Plumber', location: { city: 'Delhi' } },
    { name: 'Doe', role: 'Electrician', location: { city: 'Delhi' } }
];

function runTests() {
    console.log('Running SearchManager Tests...');

    // Test 1: Filter by role
    const electricianResults = SearchManager.filterLabours(mockLabours, 'Electrician', '');
    if (electricianResults.length === 2) {
        console.log('✓ Test 1 Passed: Filter by role');
    } else {
        console.error('✗ Test 1 Failed: Filter by role');
    }

    // Test 2: Filter by city (case-insensitive)
    const delhiResults = SearchManager.filterLabours(mockLabours, '', 'delhi');
    if (delhiResults.length === 2) {
        console.log('✓ Test 2 Passed: Filter by city');
    } else {
        console.error('✗ Test 2 Failed: Filter by city');
    }

    // Test 3: Filter by role and city
    const bothResults = SearchManager.filterLabours(mockLabours, 'Electrician', 'Mumbai');
    if (bothResults.length === 1 && bothResults[0].name === 'John') {
        console.log('✓ Test 3 Passed: Filter by role and city');
    } else {
        console.error('✗ Test 3 Failed: Filter by role and city');
    }
}

// In a real Maven build, this would be run via a test runner like Jest or Mocha.
// For this demo, we can trigger it with node.
if (require.main === module) {
    runTests();
}
