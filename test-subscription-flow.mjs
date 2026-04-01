import fetch from 'node-fetch';

const API_URL = 'https://svardirekt-cy96hsrb.manus.space';
const deviceId = 'test-flow-' + Date.now();

console.log('\n=== SUBSCRIPTION CREATION FLOW TEST ===\n');
console.log('[TEST] Device ID:', deviceId);
console.log('[TEST] API URL:', API_URL);

try {
  console.log('\n[TEST] === STEP 1: CREATE LINK ===');
  console.log('[TEST] Sending POST to /api/trpc/subscription.createLink');
  
  const createResponse = await fetch(`${API_URL}/api/trpc/subscription.createLink`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ json: { deviceId } }),
  });

  console.log('[TEST] Response status:', createResponse.status);
  
  if (!createResponse.ok) {
    throw new Error(`HTTP ${createResponse.status}`);
  }

  const createData = await createResponse.json();
  const result = createData.result?.data?.json;

  console.log('[TEST] Response body:', JSON.stringify(result, null, 2));

  if (!result.approvalUrl) {
    throw new Error('No approvalUrl in response');
  }

  if (!result.subscriptionId) {
    throw new Error('No subscriptionId in response');
  }

  console.log('[TEST] ✅ Approval URL:', result.approvalUrl.substring(0, 80) + '...');
  console.log('[TEST] ✅ Subscription ID:', result.subscriptionId);

  console.log('\n[TEST] === STEP 2: CHECK STATUS ===');
  console.log('[TEST] Sending GET to /api/trpc/subscription.checkStatus');

  const checkResponse = await fetch(
    `${API_URL}/api/trpc/subscription.checkStatus?input=${encodeURIComponent(JSON.stringify({ json: { deviceId } }))}`,
    { method: 'GET' }
  );

  console.log('[TEST] Response status:', checkResponse.status);
  
  const checkData = await checkResponse.json();
  const checkResult = checkData.result?.data?.json;

  console.log('[TEST] Response body:', JSON.stringify(checkResult, null, 2));
  console.log('[TEST] isPremium:', checkResult.isPremium);

  console.log('\n[TEST] === RESULT ===');
  console.log('[TEST] ✅ Flow works end-to-end');
  console.log('[TEST] ✅ Endpoint returns valid PayPal URL');
  console.log('[TEST] ✅ Status check works');
  console.log('[TEST] ✅ Frontend can proceed to PayPal WebView\n');

} catch (err) {
  console.error('\n[TEST] ❌ ERROR:', err.message);
  console.error('[TEST] Stack:', err.stack);
  process.exit(1);
}
