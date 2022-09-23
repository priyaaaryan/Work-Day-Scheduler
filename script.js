// to hold start of day
var hours_start = 9;
// to hold end of day
var hours_end = 18;
// wait untill page loads
$(function () {
  // get element
  var currentDay = document.getElementById("currentDay");
  // dynamically add date
  currentDay.innerHTML = moment().format("dddd, MMMM Do");
  // get element
  var containers = $(".container");
  /**
   * to generate rows
   */
  function gen_rows() {
    // string to hold rows dom
    var rows = ``;
    /**
     * check if we are past, before, or current
     *
     * @param   {number}  hourToCheck  The hour to check
     * return   statate of hour
     */
    function check(hourToCheck) {
      // the current time
      var now = moment();
      // the row's hour
      var dateToCheck = now.hour(hourToCheck);
      // check if hour is less, more, equal
      if (moment().isAfter(dateToCheck)) {
        return 1;
      } else if (moment().isBefore(dateToCheck)) {
        return -1;
      }
      return 0;
    }
    // dynamically add rows to dom
    for (var i = hours_start; i < hours_end; i++) {
      // color of row
      var color;
      // select color of row depending of
      // state
      if (check(i) === 1) {
        color = "p-3 mb-2 bg-secondary text-white";
      } else if (check(i) === 0) {
        color = "p-3 mb-2 bg-danger text-white";
      } else {
        color = "p-3 mb-2 bg-success text-white";
      }
      console.log(`${i}   ` + ` ${localStorage.getItem(`hour-${i}`)}`);
      // append the rows dom
      // access local storage for this rows information
      // color the row
      rows += `<tr>
        <td>${moment({ hour: i }).format("h A")}</td>
        <td class="${color} rounded-right">
			<div class="input-group w-90 ${color} rounded-right mb-4">
  				<textarea class="form-control ${color} rounded-right" id="hour-${i}"  rows="1">
  					${localStorage.getItem(`hour-${i}`) ? localStorage.getItem(`hour-${i}`) : ""}
  				</textarea>
  				<div class="input-group-append p-3 mb-2 bg-info rounded-right text-white">
    				<span class="input-group-text p-3 mb-2 bg-info rounded-right text-white">
    					<i class="fa fa-calendar p-3 mb-2 bg-info rounded-right text-white " aria-hidden="true"></i>
    				</span>
  				</div>
			</div>
        </td>
      </tr>
      `;
    }
    // return rows one
    return rows;
  }
  // dynamically add table to page
  // table rows generated dynamically
  containers.html(`<table class="table">
    <tbody>
    	<tr>
      		${gen_rows()}
      		<tr>
        		<td>
        		<td>
        	</tr>
      	</tr>
    </tbody>
  </table>`);
  // reset hour start
  hours_start = 9;
  // register callbacks in inputs to store
  // whatever is typed
  for (var i = hours_start; i < hours_end; i++) {
    // closure to add callback
    (function (n) {
      // the callback will double from dom
      // becaue row is dynamically added
      $(document).on("change", `#hour-${n}`, function () {
        localStorage.setItem(`hour-${n}`, $(this).val());
      });
    })(i);
  }
});
