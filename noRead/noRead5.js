async function asyncExample() {
    await myPromisifiedTimeout(1000);
    await myPromisifiedTimeout(5000);
    console.log(123);
}
asyncExample();