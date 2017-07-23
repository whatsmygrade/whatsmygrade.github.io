function test(){
    alert('test function')
}

function testResults (form) {
    var t1 = parseFloat(form.testone.value);
    var t2 = parseFloat(form.testtwo.value);
    var t3 = parseFloat(form.testthree.value);
    var t4 = parseFloat(form.testfour.value);
    var tests = [t1,t2,t3,t4];

    var i;
    var testsTaken = [];
    for(i =0; i < 4; i++){
        var bool = tests[i] !== tests[i]; //tests for NaN
        if (!bool) {
            testsTaken = testsTaken.concat([tests[i]]);
        }
    }
    testsTaken = testsTaken.sort(function (a, b) {  return a - b;  });

    var testWeights = [.06,.09,.12,.18];
    var avgTest = 0;
    var weights = 0;
    var j;

    for (j=0; j < testsTaken.length; j++) {
        avgTest = avgTest + testsTaken[j]*testWeights[j];
        weights = weights + testWeights[j];

    }
    if (testsTaken.length < 4){
        var restOfWeights = testWeights.slice(testsTaken.length);
        var weightsLeft = restOfWeights.reduce(function(a, b) { return a + b; });

    } else if (testsTaken.length == 4) {
        var weightsLeft = 0;
    }
    var avgTest = avgTest/weights;
    var fin = parseFloat(form.fin.value);
    var labq = parseFloat(form.labq.value) || 0;
    var labch = parseFloat(form.labch.value) || 0;
    var laba = parseFloat(form.laba.value) || 0;
    var cl = parseFloat(form.clickers.value) || 0;
    var opt = parseFloat(form.opt.value) || 0;
    var hw = parseFloat(form.hw.value) || 0;
    var wiki = parseFloat(form.wiki.value) || 0;
    var read = parseFloat(form.read.value) || 0;
    var lect = parseFloat(form.lect.value) || 0;

    var bucket = (cl*3 + hw*5 + opt*3 + wiki*2 + read + lect)/15;
    var lab = ((5*labq + 10*labch + 5*laba)/100)/.20
    var bool2 = fin !== fin
    if (!bool2) {
        var core = ((avgTest*45 + 5*labq + 10*labch + 5*laba + fin*25)/100)/.9;
    } else if (bool2) {
        var core = ((avgTest*45 + 5*labq + 10*labch + 5*laba)/100)/.65;
    }
    var ec = Math.max(0,Math.min(5,bucket*15/100)+hw*5/100-10)/2*100;
    var bucket2 = Math.min(10,(cl*3 + hw*5 + opt*3 + wiki*2 + read + lect)/100)/.1;
    var final = core*.90 + ec*.02 + bucket2*.10;
    var grade;
    if (final < 60){
        grade = "F :'(";
    } else if (final < 70){
        grade = "D :(";
    } else if (final < 80) {
        grade = "C";
    } else if (final < 90) {
        grade = "B";
    } else if (final < 100) {
        grade = "A";
    } else if (final < 200) {
        grade = "wtf dude";
    }
    document.getElementById("ec").innerHTML = Number(ec.toFixed(3));
    document.getElementById("core").innerHTML = Number(core.toFixed(3));

    document.getElementById("bucket").innerHTML = Number(bucket.toFixed(3));
    document.getElementById("bucket2").innerHTML = Number(bucket2.toFixed(3));

    document.getElementById("testavg").innerHTML = Number(avgTest.toFixed(3));
    document.getElementById("final").innerHTML = Number(final.toFixed(3));
    document.getElementById("grade").innerHTML = grade;
    document.getElementById("lab").innerHTML = Number(lab.toFixed(3));

    text = "Your grade in the class is a " + Number(final.toFixed(3)) + ", which is a(n) " + grade
    +". "


    if (weightsLeft != 0) {
        var countsfor = weightsLeft+.25
        var forAB = (80-((1-countsfor)*final))/countsfor;
        var forAnA = (90-((1-countsfor)*final))/countsfor;
        text = text + "In order to get a B, you will need to have a " + Number(forAB.toFixed(3))
        + "% average on the remaining test(s) and the final. " +
        "For an A, you will need a " + Number(forAnA.toFixed(3)) + "% average " +
        "on the remaining test(s) and the final.\nNote: Due to variable test weights, "
        + "this will likely be an overstimate."
    } else if (bool2) {
        var forAnA = (90-(.75*final))/.25
        var forAB = (80-(.75*final))/.25
        text = text + "In order to get a B, you will need to have a " + Number(forAB.toFixed(3))
        + "% average on the final. " +
        "For an A, you will need a " + Number(forAnA.toFixed(3)) + "% average on"
        + " the final."
    }
    document.getElementById("results").innerHTML = text;


}
