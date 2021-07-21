window.addEventListener('DOMContentLoaded', (event) => {
    console.log("DOM Loaded!");

    // Query DOM
    var createSessionButton = document.getElementById("createSession");
    var joinSessionButton = document.getElementById("joinSession");

    createSessionButton.addEventListener('click', function () {

        // retrieve and save username
        var usernameInput = document.getElementById("username");
        var player1 = usernameInput.value;

        if (player1 != "") {
            // declare connection
            var socket = io.connect('http://localhost:4000');
            var socketConnected = false;

            // connect to web socket
            socket.on('connect', function () {
                socketConnected = true;
                console.log('Connected! ID: ' + socket.id);
            });

            // sends username back to server
            socket.emit("createSess", player1);

            socket.on("session-created", function (data) {
                var data = data;
                console.log("Player 1 id: " + data.id);

                document.getElementById("lobby").innerHTML =

                    // Displays loading page when username is entered and createSessionButton is clicked
                    `
                    <div class="container" style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                        <div class="row">
                            <div class="col-sm-12 d-flex justify-content-center">
                                <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        </div>
        
                        <div class="row">
                            <div class="col-md-4"></div>
                            <div class="col-md-4">
                                <br>
                                <p class="d-flex justify-content-center">Waiting for player 2 to join....</p>
        
                                <p class="d-flex justify-content-center" id="sessTxt">Your ID is: ${data.id}</p>
        
                                <div class="text-center pt-4">
                                    <button id='close' class="btn btn-secondary">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                `;

                var close = document.getElementById("close");

                close.addEventListener('click', function () {
                    //revert back to main page when cancel button is clicked
                    location.reload();
                });
            });
        } else {
            alert("Please enter a username!");
        }
    });

    joinSessionButton.addEventListener('click', function () {
        // Display when "Join Game" button is clicked
        document.getElementById("lobby").innerHTML = `
            <div class='centered container mx-auto'>
                <div class="row">
                    <div class="col-sm-4"></div>
                    <div class="col-sm-4">
                        <form onsubmit="return false">
                            <div class="form-group">
                                <label for="session">Enter sessionID: </label>
                                <input id="session" class="form-control" type="text" name="session" placeholder="session ID">
                            </div>

                            <div class="d-flex justify-content-center">
                                <button id='join' class='btn btn-primary text-center btn-block'>Join</button>
                            </div>
                            <div class="d-flex justify-content-center pt-3">
                                <button id='close' class='btn btn-secondary text-center btn-block'>Close</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;

        var join = document.getElementById("join");

        // join.addEventListener('click', function() {
        //         socket.emit("join-session",code,name);
        // });

        var close = document.getElementById("close");

        close.addEventListener('click', function () {
            //revert back to main page when cancel button is clicked
            location.reload();
        });

    });
});