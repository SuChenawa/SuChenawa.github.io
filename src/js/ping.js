// window.onload = function () {
//     ping("http://files.suchenawa.com:1000/", "ping-result-file", "status-file");
//     ping("https://another-example.com", "ping-result-2");

// };
document.addEventListener('DOMContentLoaded', function() {
    ping("https://files.suchenawa.com:1000/", "ping-result-file", "status-file");
    ping("https://another-example.com", "ping-result-2");
});
function ping(url, resultElementId, serverStatus) {
    const start = new Date().getTime();
    fetch(url, { mode: 'no-cors' })
        .then(response => {
            const end = new Date().getTime();
            const ms = end - start;
            document.getElementById(resultElementId).innerText = `${ms} ms`;
            document.getElementById(serverStatus).innerText = `OK`;
        })
        .catch(error => {
            document.getElementById(resultElementId).innerText = `请求失败: ${error.message}`;
            document.getElementById(serverStatus).innerText = `Bad`;
        });
}
