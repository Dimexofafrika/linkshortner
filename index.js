const drpDwn = document.querySelector("#drpDwn")


function menu(){
    if(drpDwn.classList.contains('hidden')){
        drpDwn.classList.remove('hidden')
    } else{
        drpDwn.classList.add('hidden')
    }
}

let shortLink;
let copybtn;

async function shortenLink(){
    const accessToken = 'b6c23e813291b002090255458e064eb7ad17b155';
    const inputUrl = document.getElementById('input')
    const longUrl = inputUrl.value; // Use an HTTPS URL

    const url = `https://api-ssl.bitly.com/v4/shorten`;

    const data = {
        long_url: longUrl,
    };

    const options = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
             'Content-Type': 'application/json',
        },
         body: JSON.stringify(data),
    };

    
    const response = await fetch(url, options);
    const result = await response.json();
    const shortLink = result.link
    console.log(shortLink)

    const shorturlList = document.getElementById("shorturlList")

    const listItem = document.createElement("li")
    const link = document.createElement('a')
    const inputlink = document.createElement('span')
    const copybtn = document.createElement('button')
    const hr = document.createElement('hr')
    copybtn.textContent = 'copy'
    inputlink.textContent = longUrl
    link.href = shortLink
    link.textContent = shortLink
    listItem.appendChild(inputlink)
    listItem.appendChild(hr)
    listItem.appendChild(link)
    listItem.appendChild(copybtn)
    listItem.className = "bg-white w-full rounded-md flex flex-col py-4 px-4 mb-8 md:h-16 md:flex-row md:items-center"
    // hr.className = "md:hidden"
    inputlink.className = "text-black font-semibold text-lg mb-2 md:text-lg md:font-semibold md:flex-1 md:mb-0"
    link.className = "my-2 text-cyan-300 font-semibold text-lg md:font-semibold md:text-lg md:my-0"
    copybtn.className = "bg-cyan-300 py-2 px-4 rounded text-white font-semibold text-base md:ml-8"
    shorturlList.appendChild(listItem)


    copybtn.addEventListener('click', ()=>{
        navigator.clipboard.writeText(shortLink);
        copybtn.textContent = 'copied!'
        copybtn.classList.remove('bg-cyan-300')
        copybtn.classList.add('bg-violet-950')
    })
}

const shortenbtn = document.querySelector("#shortenbtn")
shortenbtn.addEventListener('click', ()=>{
    const inputUrl = document.getElementById('input')
    if(!inputUrl.value){
        inputUrl.classList.remove('border-white')
        inputUrl.classList.add('border-red-700')
        inputUrl.classList.add('placeholder-red-700')
    } else{
        inputUrl.classList.remove('border-red-700')
        shortenLink()
    }
})