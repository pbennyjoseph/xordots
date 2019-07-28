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
              <h2><span class="text-monospace badge badge-dark">xordots</span></h2>
              <img id="loader" src="load.svg"
                style="display:none;width:50%;height:50%" />

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
                <!-- <select name="rr-w" class="mb-2 form-control" onchange="rrw(this.value);" required>
                <option value="" disabled>None</option>
                <option value="4" selected>4</option>
                <?php
                  for($i=5;$i<12;$i++){
                    echo '<option value="'.$i.'">'.$i.'</option>';
                  }
                ?>
              </select>
              <input id="startplayer" type="hidden"></input>
              <label class="d-inline-block" for="sr-w"><strong>Player: </strong></label>
              <select name="sr-w" class="mb-2 form-control" onchange="srw(this.value)" required>
                <option value="" disabled>None</option>
                <option value="1" href="#" selected>Human</option>
                <option value="0" href="#">Computer</option>
              </select> -->
                <input id="startplayer" type="hidden"></input>
                <div class="btn-toolbar mx-auto mb-2 " role="toolbar">
                  <div class="btn-group" role="group">
                    <div class="input-group-prepend">
                      <div class="input-group-text" id="namedisplay">Start Player</div>
                    </div>
                    <button id="playerinit" type="button" class="playerconfig btn btn-secondary ">You</button>
                    <button type="button" class="playerconfig btn btn-secondary">Bot</button>
                  </div>
                </div>
                <button id="gamestarter" class="btn btn-outline-primary">Start Game</button>
              </div>
            </center>
          </div>
        </div>

      </div>
    <!-- </div> -->
  </div>
  <!-- <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"
    integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous">
  </script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"
    integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous">
  </script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
    integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous">
  </script> -->
  <script src="main.js"></script>
</body>

</html>