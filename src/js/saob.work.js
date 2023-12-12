// const saobWork = document.getElementById('getsaobWork');
const saobWorkResult = document.getElementById('saobWork');

function getsaobWork(){
    const loadanim = '<div class="loader"></div>';
    saobWorkResult.innerHTML = loadanim;
    fetch('https://saob.work/api',{
        method: 'GET',
        mode: 'cors'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('网络请求失败');
            }
            return response.json();
        })
        .then(data => {
            const responseData = data.data;
            console.log('从API获取到的数据:', responseData);
            saobWorkResult.innerHTML = responseData;
        })
        .catch(error => {
            console.error('发生错误:', error);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    getsaobWork()
})

