const boroughButtons = document.querySelectorAll('button');

boroughButtons.forEach(boroughButton => {
    boroughButton.addEventListener('click', function() {
        const borough = boroughButton.innerText.toUpperCase();
        let numOfResults = 10;
        if(document.getElementById('numOfResults').value != "")
            numOfResults = document.getElementById('numOfResults').value;

        populate(borough, numOfResults);
    });
});

function populate(borough, numOfResults){
    const url = `https://data.cityofnewyork.us/resource/erm2-nwe9.json?borough=${borough}&agency=NYPD`;
    console.log(url);

    fetch(url)
        .then(response => response.json())
        .then(dataArray => {
            dataArray = getRandomElementsArray(dataArray, numOfResults);
            dataArray.sort((a, b) => (a.descriptor > b.descriptor) ? 1 : -1)
            const resultDiv = document.getElementById('results');
            resultDiv.innerText = '';
            dataArray.map( (dataEntry, index) =>{
                addResultElement(resultDiv, dataEntry, index);
            })

            //addResolutionButtonListener();
        });
}

function getRandomElementsArray(arr, numOfElements){
    const randomArr = [] 
    for(let i = 0; i < numOfElements; i++){
        const randomIndex = Math.floor(Math.random() * arr.length);
        randomArr.push(arr[randomIndex]);
    }
    return randomArr;
}

function addResultElement(resultDiv, dataEntry, elementIndex){
    const newDiv = document.createElement('div');

    const newP = document.createElement('p');
    const newContent = document.createTextNode(`${dataEntry.descriptor}`);
    newP.appendChild(newContent);

    const newResolutionP = document.createElement('p');
    newResolutionP.append(document.createTextNode(`${dataEntry.resolution_description}`));
    newResolutionP.setAttribute('class', 'resolutionP');
    newResolutionP.setAttribute('id', `resolution-${elementIndex}`);
    newResolutionP.style.display = 'none';

    const newButton = document.createElement('button');
    newButton.append(document.createTextNode('What did the police do?'));
    newButton.setAttribute('class', 'btn btn-danger btn-sm');

    resultDiv.appendChild(newDiv);
    resultDiv.appendChild(newResolutionP);
    newDiv.appendChild(newP);
    newDiv.appendChild(newButton);
    newDiv.setAttribute('class', 'resultElement');

    newButton.addEventListener('click', function(){
        const resolutionP = document.getElementById(`resolution-${elementIndex}`);
        let display = resolutionP.style.display;
        
        if(display == 'none'){
            resolutionP.style.display = 'block';
        }else{
            resolutionP.style.display = 'none';
        }
    });

}