const resultText = document.getElementById('data')

async function postData(url = "", data = {}) {

    const response = await fetch(url, {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(data),
    });
    return response.json();
}

chrome.tabs.query({currentWindow: true, active: true}, function(tabs){

    let link = tabs[0].url;
    postData("https://mrpratik.tech/yt-playlist/timer", { link: link }).then((data) => {

      if(data.success === "False"){
          resultText.innerHTML = "Request failed";

      }else{  
          resultText.innerHTML = "Request successful";

          document.getElementById("number").innerHTML += data["no_of_vids"];
          document.getElementById("avg").innerHTML += data["avg_vid"];
          
          document.getElementById("myTable").rows[1].cells[1].innerHTML = data["1x"];
          document.getElementById("myTable").rows[2].cells[1].innerHTML = data["1.25x"];
          document.getElementById("myTable").rows[3].cells[1].innerHTML = data["1.5x"];
          document.getElementById("myTable").rows[4].cells[1].innerHTML = data["1.75x"];
          document.getElementById("myTable").rows[5].cells[1].innerHTML = data["2x"];
      }

    });
});
