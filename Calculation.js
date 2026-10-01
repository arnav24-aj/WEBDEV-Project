function calculateAttendance() {
    let total = parseInt(document.getElementById("TC").value);
    let attended = parseInt(document.getElementById("CA").value);

    if (isNaN(total) || isNaN(attended)) {
        return; 
    }

    if (attended > total) {
        alert("Error: Attended classes cannot be more than total classes.");
        return;
    }

    let percent = Math.floor((attended / total) * 100);
    document.getElementById("PR").textContent = percent + "%";

    let SKP = document.getElementById("SR");

    if (percent >= 75) {
        let canSkip = Math.floor((attended / 0.75) - total);
        
        if (percent === 75) {
            SKP.textContent = `You are at 75% attendance. You can't skip any classes. 😎`;
        } else {
            SKP.textContent = `You can skip ${canSkip} classes! 😎`;
        }
    } else {
        let needToAttend = Math.ceil((0.75 * total - attended) / 0.25);
        SKP.textContent = `You have to attend next ${needToAttend} classes to reach 75% 😰`;
    }

    localStorage.setItem("savedTotal", total);
    localStorage.setItem("savedAttended", attended);
}

document.getElementById("btn").onclick = calculateAttendance;

window.onload = function() {
    let savedTotal = localStorage.getItem("savedTotal");
    let savedAttended = localStorage.getItem("savedAttended");

    if (savedTotal !== null && savedAttended !== null) {
        document.getElementById("TC").value = savedTotal;
        document.getElementById("CA").value = savedAttended;
        
        calculateAttendance();
    }
};