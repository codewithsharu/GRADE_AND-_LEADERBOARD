



document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("myButton");

    function toggleHover() {
        button.classList.toggle("hover");
    }

    
    setInterval(toggleHover, 3000);
});


          const ctx = document.getElementById('myChart').getContext('2d');
        const chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Maths', 'Java', 'Python'],
                datasets: [{
                    label: '#Average',
                    data: [0, 0, 0],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
        

        var studentRecords = JSON.parse(localStorage.getItem('studentRecords')) || [];

        function submitData() {
            var name = document.getElementById('name').value;
            var rollNumber = document.getElementById('rollNumber').value;
            var mathsMarks = parseInt(document.getElementById('mathsMarks').value);
            var javaMarks = parseInt(document.getElementById('javaMarks').value);
            var pythonMarks = parseInt(document.getElementById('pythonMarks').value);

            if (!name || !rollNumber || isNaN(mathsMarks) || isNaN(javaMarks) || isNaN(pythonMarks)) {
                alert('Please fill out all fields with valid data.');
                return;
            }

            var overallMarks = mathsMarks + javaMarks + pythonMarks;

            var studentRecord = {
                name: name,
                rollNumber: rollNumber,
                mathsMarks: mathsMarks,
                javaMarks: javaMarks,
                pythonMarks: pythonMarks,
                overallMarks: overallMarks
            };

            studentRecords.push(studentRecord);
            localStorage.setItem('studentRecords', JSON.stringify(studentRecords));
            clearFormFields();
            updateSubmittedCount();
            updateSubmittedData();
            updateAverages();
            updateChart();
        }

        function clearFormFields() {
            document.getElementById('name').value = '';
            document.getElementById('rollNumber').value = '';
            document.getElementById('mathsMarks').value = '';
            document.getElementById('javaMarks').value = '';
            document.getElementById('pythonMarks').value = '';
        }

        function clearData() {
            localStorage.removeItem('studentRecords');
            studentRecords = [];
            updateSubmittedCount();
            updateSubmittedData();
            updateAverages();
            updateChart();
        }

        function showTopOverallStudents() {
            studentRecords.sort(function(a, b) {
                return b.overallMarks - a.overallMarks;
            });

            displayTopStudents('topOverallList', 'Overall Marks', studentRecords);
            updateTopStudentNames('top1JavaName', 'top2JavaName', 'top3JavaName', studentRecords);
            updateTopStudentNames('top1PythonName', 'top2PythonName', 'top3PythonName', studentRecords);
            updateTopStudentNames('top1MathsName', 'top2MathsName', 'top3MathsName', studentRecords);
        }

        function showTopMathsStudents() {
            studentRecords.sort(function(a, b) {
                return b.mathsMarks - a.mathsMarks;
            });

            displayTopStudents('topMathsList', 'Maths Marks', studentRecords);
            updateTopStudentNames('top1MathsName', 'top2MathsName', 'top3MathsName', studentRecords);
        }

        function showTopJavaStudents() {
            studentRecords.sort(function(a, b) {
                return b.javaMarks - a.javaMarks;
            });

            displayTopStudents('topJavaList', 'Java Marks', studentRecords);
            updateTopStudentNames('top1JavaName', 'top2JavaName', 'top3JavaName', studentRecords);
        }

        function showTopPythonStudents() {
            studentRecords.sort(function(a, b) {
                return b.pythonMarks - a.pythonMarks;
            });

            displayTopStudents('topPythonList', 'Python Marks', studentRecords);
            updateTopStudentNames('top1PythonName', 'top2PythonName', 'top3PythonName', studentRecords);
        }

        function displayTopStudents(containerId, subjectLabel, students) {
            var topList = document.getElementById(containerId);
            topList.innerHTML = '';

            var topStudents = students.slice(0, Math.min(3, students.length));

            for (var i = 0; i < topStudents.length; i++) {
                var student = topStudents[i];

                var studentInfo = document.createElement('p');
                var subjectMarks = subjectLabel === 'Overall Marks' ? student.overallMarks :
                    subjectLabel === 'Maths Marks' ? student.mathsMarks :
                    subjectLabel === 'Java Marks' ? student.javaMarks :
                    subjectLabel === 'Python Marks' ? student.pythonMarks : 0;

                studentInfo.innerHTML = 'Name: ' + student.name + '<br>Roll Number: ' + student.rollNumber + '<br>' + subjectLabel + ': ' + subjectMarks + '<hr>';
                topList.appendChild(studentInfo);
            }
        }

        function updateTopStudentNames(id1, id2, id3, students) {
            var topStudents = students.slice(0, 3);

            for (var i = 0; i < topStudents.length; i++) {
                var student = topStudents[i];
                var studentName = student.name;

                var id = i + 1;
                var pTag = document.getElementById('top' + id + 'JavaName'); // Update this line for other subject
                if (pTag) {
                    pTag.textContent =  studentName;
                }
            }
        }

        function updateSubmittedCount() {
            document.getElementById('submittedCount').innerHTML = 'Submissions ' + studentRecords.length;
        }

        function updateAverages() {
            if (studentRecords.length === 0) {
                return;
            }

            var totalMathsMarks = 0;
            var totalJavaMarks = 0;
            var totalPythonMarks = 0;

            for (var i = 0; i < studentRecords.length; i++) {
                totalMathsMarks += studentRecords[i].mathsMarks;
                totalJavaMarks += studentRecords[i].javaMarks;
                totalPythonMarks += studentRecords[i].pythonMarks;
            }

            var averageMathsMarks = totalMathsMarks / studentRecords.length;
            var averageJavaMarks = totalJavaMarks / studentRecords.length;
            var averagePythonMarks = totalPythonMarks / studentRecords.length;

            document.getElementById('averageMathsMarks').textContent = averageMathsMarks.toFixed(2);
            document.getElementById('averageJavaMarks').textContent = averageJavaMarks.toFixed(2);
            document.getElementById('averagePythonMarks').textContent = averagePythonMarks.toFixed(2);
        }

        function updateSubmittedData() {
            var submittedDataContainer = document.getElementById('submittedData');
            submittedDataContainer.innerHTML = '';

            for (var i = 0; i < studentRecords.length; i++) {
                var student = studentRecords[i];

                var studentInfo = document.createElement('p');
                studentInfo.innerHTML = 'Name: ' + student.name + '<br>Roll Number: ' + student.rollNumber + '<br>Maths Marks: ' + student.mathsMarks + '<br>Java Marks: ' + student.javaMarks + '<br>Python Marks: ' + student.pythonMarks + '<br>Overall Marks: ' + student.overallMarks + '<hr>';
                submittedDataContainer.appendChild(studentInfo);
            }
        }

        function updateChart() {
            if (studentRecords.length === 0) {
                return;
            }

            var totalMathsMarks = 0;
            var totalJavaMarks = 0;
            var totalPythonMarks = 0;

            for (var i = 0; i < studentRecords.length; i++) {
                totalMathsMarks += studentRecords[i].mathsMarks;
                totalJavaMarks += studentRecords[i].javaMarks;
                totalPythonMarks += studentRecords[i].pythonMarks;
            }

            var averageMathsMarks = totalMathsMarks / studentRecords.length;
            var averageJavaMarks = totalJavaMarks / studentRecords.length;
            var averagePythonMarks = totalPythonMarks / studentRecords.length;

            chart.data.datasets[0].data = [averageMathsMarks, averageJavaMarks, averagePythonMarks];
            chart.update();
        }

        updateSubmittedCount();
        updateAverages();
        updateSubmittedData();
        updateChart();
        document.getElementById('exploreButton').addEventListener('click', function() {
            window.location.href = 'data.html';
          });
        
        
        document.getElementById('homeButton').addEventListener('click', function() {
            window.location.href = 'index.html';
          });
          function goToHomePage() {
            
            window.location.href = 'index.html';
          }
          
        
 