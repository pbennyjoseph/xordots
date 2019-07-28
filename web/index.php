<!doctype html>
<html lang="en">

<head>
  <meta charset="utf-8">

  <link rel="icon" href="favicon.png">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
    integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">
</head>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"></script>
<style>
  html,
  body {
    height: 100%;
  }

  body {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    padding-top: 40px;
    padding-bottom: 40px;
    background-color: #f5f5f5;
  }
</style>
<title>xordots</title>
</head>

<body>

  <!-- Modal -->
  <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle"><i class="fa fa-info-circle" aria-hidden="true"></i>Info
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div id="modal-text-dd" class="modal-body">
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="redirgit" tabindex="-1" role="dialog" aria-labelledby="redirgitTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">View Source
          </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div id="modal-text-dd" class="modal-body">
          <center><button onclick="window.location.href = 'https://github.com/pbennyjoseph/xordots'"
              class="justify-content-center btn btn-primary">View Source in Github <i class="fab fa-github"></i>
            </button></center>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>



  <div class="modal fade" id="gameinfomodal" tabindex="-1" role="dialog" aria-labelledby="gameinfomodalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="gameinfomodalLabel">Game Info</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p class="md-line" data-line="10">&bull; Players join the dots (of any length) in horizontal manner.</p>
          <p class="md-line" data-line="12">&bull; The last player to join the dots wins the game.</p>
          <p class="md-line" data-line="14">&bull; Two players take turns to play the game.</p>
          <h3 class="md-line" data-line="16">The Rules of the game</h3>
          <p class="md-line" data-line="18">&bull; The player (with the turn) selects a single row.</p>
          <p class="md-line" data-line="20">&bull; The player joins any two dots in that row of any length.</p>
          <p class="md-line" data-line="22">&bull; The player cannot join the dots in vertical or diagonal manner.</p>
          <p class="md-line" data-line="24">(i.e. not accross multiple rows or columns)</p>
          <p class="md-line" data-line="26">&bull; The player cannot join the dots which are already joined or makes an
            overlap.</p>
          <h3 class="md-line" data-line="28">The Computer and Input</h3>
          <p class="md-line" data-line="30">&bull; In the game following, the computer plays the game with human
            opponent.</p>
          <p class="md-line" data-line="32">&bull; The player gets to choose the game height, and the starting player.
          </p>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>



  <div class="container-fluid">
    <!-- <div class="alert alert-warning alert-dismissible fade" role="alert">
  <strong>Holy guacamole!</strong> You just made an Illegal Move.
  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </button>
</div> -->
    <div class="row justify-content-center">
      <!-- <div class="col col-lg-auto "> -->
      <div class="mx-1 mt-1 card border-dark">
        <div class="card-body">

          <center>
            <h2><span class="text-monospace badge badge-dark"><span class="float-left badge badge-warning"><i
                    class="fab fa-github" onclick="$('#redirgit').modal('show');"></i></span>&nbsp;xordots&nbsp;<span
                  class="float-right badge badge-warning" onclick="$('#gameinfomodal').modal('show');"><i
                    class="fa fa-info-circle"></i></span></span></h2>
            <img id="loader" src="load.svg" style="display:none;width:50%;height:50%" />

            <div id="pattern" style="display:none">
            </div>
            <div id="init">
              <input id="rownumbers" type="hidden"></input>
              <!-- <label class="d-inline-block" for="rr-w"><strong>Rows: </strong></label> -->
              <div class="btn-toolbar mb-2" role="toolbar">
                <div class="btn-group mr-2 my-2" role="group">
                  <div class="input-group-prepend">
                    <div class="input-group-text" id="rowsdisplay">Rows</div>
                  </div>
                  <button id="rowsinit" type="button" class="rowconfig btn btn-success">4</button>
                  <button type="button" class="rowconfig btn btn-success">5</button>
                  <button type="button" class="rowconfig btn btn-success">6</button>
                </div>
                <div class="btn-group mr-2 my-2" role="group" aria-label="Second group">
                  <button type="button" class="rowconfig btn btn-warning">7</button>
                  <button type="button" class="rowconfig btn btn-warning">8</button>
                  <button type="button" class="rowconfig btn btn-warning">9</button>
                </div>
                <div class="btn-group my-2" role="group" aria-label="Third group">
                  <button type="button" class="rowconfig btn btn-danger">10</button>
                  <button type="button" class="rowconfig btn btn-danger">11</button>
                </div>
              </div>
              <input id="startplayer" type="hidden"></input>
              <div class="btn-toolbar mx-auto mb-2 " role="toolbar">
                <div class="btn-group" role="group">
                  <div class="input-group-prepend">
                    <div class="input-group-text" id="namedisplay">Start Player</div>
                  </div>
                  <button id="playerinit" type="button" class="playerconfig btn btn-secondary">You</button>
                  <button type="button" class="playerconfig btn btn-secondary">Bot</button>
                </div>
              </div>

              <div class="btn-toolbar mx-auto my-2 " role="toolbar">
                <div class="btn-group" role="group">
                  <div class="input-group-prepend">
                    <div class="input-group-text" id="theme">Default Theme</div>
                  </div>
                    <button type="button" class="btn btn-dark dropdown-toggle dropdown-toggle-split"
                      data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    </button>
                    <div class="dropdown-menu">
                      <a class="theme dropdown-item text-primary" href="#" >Default</a>
                      <a class="theme dropdown-item text-warning" href="#" >Yellow</a>
                    </div>
                </div>
              </div>

              <button id="gamestarter" class="btn btn-outline-primary">Start Game</button>
            </div>
          </center>
        </div>
      </div>

    </div>
  </div>
  <script src="game.js"></script>
  <script src="main.js"></script>
</body>

</html>