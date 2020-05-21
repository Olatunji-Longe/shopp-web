let currency = '$';
export let format = (x) => currency+Number.parseFloat(x).toFixed(2);