document.addEventListener('DOMContentLoaded', function profile() {
    chrome.runtime.sendMessage('fromProfileJs', function (response) {
        // Compute metrics
        var citations = response.citations
        citations.sort(function (a, b) { return b - a })
        var years = response.years

        //h-index
        var hIndex = 0
        for (var i = 0; i < citations.length; i++) {
            if (i + 1 >= citations[i]) {
                hIndex = i + 1
                break
            }
        }
        console.log('h-index ' + hIndex)

        //g-index
        var totalCitations = 0
        var gIndex = 0
        for (var i = 0; i < citations.length; i++) {
            totalCitations += parseInt(citations[i])
            if (Math.pow(i + 1, 2) <= totalCitations) {
                gIndex = i + 1
            }
            else {
                break
            }
        }
        console.log('g-index ' + gIndex)

        //m-index
        var mIndex = 0
        currentYear = new Date().getFullYear()
        var firstPubYear = (years.filter(Number)).reduce((a, b) => Math.min(a, b))
        timeGap = currentYear - (parseInt(firstPubYear) + 1)
        mIndex = (hIndex / timeGap).toFixed(2)
        console.log('m-index ' + mIndex)

        //o-index
        var oIndex = 0
        maxCitation = citations.reduce((a, b) => Math.max(a, b))
        var product = hIndex * maxCitation
        oIndex = Math.pow(product, (1 / 2)).toFixed(2)
        console.log('o-index ' + oIndex)

        //h-median
        var hCore = []
        var hMedian = 0
        citations.forEach(el => {
            if (el > hIndex) {
                hCore.push(el)
            }
        })
        function median(values) {
            if (values.length === 0) return 0;

            values.sort(function (a, b) {
                return a - b;
            });

            var half = Math.floor(values.length / 2);

            if (values.length % 2)
                return values[half];

            return (values[half - 1] + values[half]) / 2.0;
        }
        hMedian = median(hCore)
        console.log('h-median ' + hMedian)

        //e-index
        var sumCitations = 0
        for (var i = 0; i < citations.length; i++) {
            if (citations[i] != "") {
                sumCitations += parseInt(citations[i])
            }
        }
        var eIndex = ((sumCitations - (hIndex ** 2)) ** (1 / 2)).toFixed(2)
        console.log('e-index ' + eIndex)
        console.log(response.titles.length)
        console.log(sumCitations)
        //Bind data to profile template
        document.getElementById('scholarImage').setAttribute('src',response.image)
        document.getElementById('scholarName').innerText = response.scholarName
        document.getElementById('workplace').innerText = response.workplace
        document.getElementById('pubCount').innerText = response.titles.length
        document.getElementById('citCount').innerText = sumCitations
        document.getElementById('hIndex').innerText = hIndex
        document.getElementById('gIndex').innerText = gIndex
        document.getElementById('mIndex').innerText = mIndex
        document.getElementById('oIndex').innerText = oIndex
        document.getElementById('hMedian').innerText = hMedian
        document.getElementById('eIndex').innerText = eIndex
    })
})