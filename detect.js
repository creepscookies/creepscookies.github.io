async function detect() {
  const ipResponse = await fetch('https://ipinfo.io/json');
  const ipData = await ipResponse.json();
  const userIP = ipData.ip;

  const locationResponse = await fetch(`https://ipinfo.io/${userIP}/json`);
  const locationData = await locationResponse.json();

  const region = locationData.region;
  const city = locationData.city;
  const isp = locationData.org;

  const isCT = region === 'Connecticut';
  const isMacOS = navigator.platform.indexOf('Mac') !== -1;

  const ispLower = isp ? isp.toLowerCase() : '';
  const isTargetISP = ispLower.includes('education') || ispLower.includes('school') || ispLower.includes('plainville');

  if (isMacOS && isTargetISP) {
    window.location.href = 'admin.html';
  } else {
    if (isMacOS) {
        console.log("Condition met, MacOS detected");
    } else {
        console.log("Condition not met, MacOS not detected");
    }
      
    if (isTargetISP) {
        console.log("Condition met, Target ISP detected");
    } else {
        console.log("Condition not met, Target ISP not detected");
    }
  }
}

detect();
