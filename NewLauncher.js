/*
  to access these values
  you'll use:
  values[0] for the month
  values[1] for the date
  values[2] for the type
*/

/* This SHOULD work for copying text by clicking */

  
 /*This is for text selection*/
window.onload = function () {
    var selectedCell,
        table = document.getElementById('table'),
        selectCell = function (e) {
            var target = e.target,
                range, selection;
            if (target.tagName.toLowerCase() !== 'td') {
                while (target = target.parentElement) {
                    if (target.tagName.toLowerCase() === 'td') {
                        break;
                    }               
                }
            }
            if (!target || target.tagName.toLowerCase() !== 'td') {
                return;
            }
            if (selectedCell) {
                selectedCell.style.backgroundColor = '';            
            }
            target.style.backgroundColor = '#33ccff';
            selectedCell = target;
        },
        beforeCopyCell = function (e) {
            var range, selection;
            if (!selectedCell) {
                return;
            }
            if (e.type === 'keydown' && (!e.ctrlKey || e.which !== 67)) {
                return;
            }
            if (e.type === 'mousedown' && e.which !== 3) {
                return;
            }
            selectedCell.classList.toggle('selected');
            selection = window.getSelection();
            selection.removeAllRanges();
            range = document.createRange();
            range.selectNode(selectedCell);             
            selection.addRange(range);
        },
        afterKeyCopyCell = function (e) {
            if (!selectedCell) {
                return;
            }
            if (e.type === 'keyup' && (!e.ctrlKey || e.which !== 67)) {
                return;
            }
            selectedCell.classList.toggle('selected');
            selection = window.getSelection();
            selection.removeAllRanges();
        },
        afterMouseCopyCell = function (e) {
            if (!selectedCell) {
                return;
            }
            selectedCell.classList.toggle('selected');
            setTimeout(function () {
                selection = window.getSelection();
                selection.removeAllRanges();
            }, 2000); // IE's contextmenu blocks the script, zero-delay can be used
        };
    table.addEventListener('click', selectCell);
    table.addEventListener('keydown', beforeCopyCell);
    table.addEventListener('mousedown', beforeCopyCell);
    table.addEventListener('contextmenu', afterMouseCopyCell);
    document.body.addEventListener('keyup', afterKeyCopyCell);
};

var values = [];

$('button').click(function() {
  
  values[0] = $('.month').val();
  values[1] = $('.date').val();
  values[2] = $('.type').val();
  values[3] = $('.gmt').val();
  values[4] = $('.hours').val();
  values[5] = $('.version').val();
  values[6] = $('.ckDst').val();
  values[7] = $('.mins').val();
  values[8] = $('.year').val();

  var months = {
    en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    fr: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
    de: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember']
  };

  /*This is the selection process*/
  var type = {
    en: ['Restart ', 'Update ', 'Maintenance ', 'Hotfix '],
    fr: ['Restart ', 'afin de procéder la mise à jour ' + values[5], 'maintenance ' + values[5], ' afin de procéder à un hotfix.'],
    de: ['Neustart ', 'Update ' + values[5], 'Wartungsarbeiten ', 'Hotfix ']
  };

  /*This puts the 0 in front of the month*/
  var a_month = parseInt(values[0]) + 1;
  if (a_month < 10) {
    a_month = '0' + a_month;
  }
  
    /*This puts the 0 in front of the date*/
  var a_date = parseInt(values[1]);
  if (a_date < 10) {
    a_date = '0' + a_date;
  }
  
 
  
/*Define Zones*/
  var edt = values[3];
  var pdt = values[3];
  var cet = values[3];
  
/*This is for the timezone calculator*/

if ( ((values[0] == 'march') && (values[1] > '8')) || (values[0] == 'april') || (values[0] == 'may') || (values[0] == 'june') || (values[0] == 'july') || (values[0] == 'august') || ( (values[0] == 'november') && (values[1] != '1')) ) {
		edt = values[3] - 3;
		pdt = values[3] - 6;
		cet = values[3] - - 1;
} 
else {
		edt = values[3] - 4;
		pdt = values[3] - 7;
		cet = values[3] - - 2;
}

  /*This puts the world time clock in */
var anchor = 'http://www.timeanddate.com/worldclock/fixedtime.html?iso=2015-' + a_month + '-' + a_date + 'T' + values[3] + ':' + values[7] + ':00';

  /*Subtracts the hours for CET/PDT/EDT	
  var edt = values[3] - 3;
  var pdt = values[3] - 7;
  var cet = values[3] - -2;
*/
  var times = [values[3], edt, pdt, cet];

  /*This is for the the pluralization of hours */
		/*English hour text */
		if (values[4] == '1') {
			var hourtext = 'hour';
		} 
		else { var hourtext = 'hours';
		}
		/* FR hour text */
		if (values[4] == '1') {
			var frhourtext = 'heure';
		} 
		else { var frhourtext = 'heures';
		}
		/*DE hour text */
		if (values[4] == '1') {
			var dehourtext = 'stunde';
		} 
		else { var dehourtext = 'stunden';
		}

  /*This is to validate the checkbox */
var validate = 'Not Checked';

if ($('.ckDst').is(':checked')) {
   	edt = values[3] - 4;
		pdt = values[3] - 7;
		cet = values[3] - - 2;
} else if {
		edt = values[3] - 3;
		pdt = values[3] - 6;
		cet = values[3] - - 1;
}
else {
}
 
  
  
 /*This is to put in DST
 		if ($('.ckDst') == ':checked') {
		edt = values[3] - 4;
		pdt = values[3] - 7;
		cet = values[3] - - 2;
		} 
		else { 
		edt = values[3] - 3;
		pdt = values[3] - 6;
		cet = values[3] - - 1;
		}
		*/
		
/*End of the DST*/		
		
 /* Update number only */
if (values[5] == '') {
   var updatenumber = type['en'][values[2]];
   var frupdatenumber = frlaunchweird;
   var deupdatenumber = type['de'][values[2]];
  } 
  else { 
    var updatenumber = type['en'][values[2]] + ' ' + values[5];
	var frupdatenumber = ' ' + values[5];
	var deupdatenumber = ' ' + ' ' + values[5];
  }

  /*Subtracts the hours for CET/PDT/EDT	
  var edt = values[3] - 3;
  var pdt = values[3] - 6;
  var cet = values[3] - -1;

  var times = [values[3], edt, pdt, cet];*/
  
    /*English article text 
if ((type['en'][values[2]] == 'update') && (values[5] == null) ) {
   var articletext = 'an update';
} else if (type['en'][values[2]] == 'update') {
   var articletext = 'update';
}
*/
 
  
/* AM and PM */
if (edt <= 11	) {
	var ampm = ' AM';
}
else {
	var ampm = ' PM';
}
if (pdt <= 11	) {
	var pampm = ' AM';
}
else {
	var pampm = ' PM';
}
if (cet <= 11	) {
	var campm = ' AM';
}
else {
	var campm = ' PM';
}	
	
  /*this is removing the output*/
  $('#output').css('display', 'block').children('span').text('');

  /*English Generation*/
  var en_output = '&ltbr&gt;» Date: ' + months['en'][values[0]] + ' ' + values[1] + ', ' + values[3] + ':' + values[7] + ' GMT/ ' + edt + ':' + values[7] + ampm + ' EDT/ ' + pdt + ':' + values[7] + pampm +' PDT &ltbr&gt; » Duration: ' + values[4] +' ' + hourtext + ' &ltbr&gt;» Update: ' + updatenumber + '&ltbr&gt;  ';
  var en_subject = months['en'][values[0]] + ' ' + values[1] + ', 2015';
  var en_forum = 'The servers will come down for ' + updatenumber + ' on ' + months['en'][values[0]] + ' ' + values[1] + ', at ' + values[3] + ':' + values[7] + ' GMT/ ' + edt + ':' + values[7] + ampm +' EDT/ ' + pdt + ':' + values[7] + pampm + ' PDT.([url="';
  var enforum2 = '"]check this link to see when this is in your timezone)[/url].  The downtime is estimated to take  '  + values[4] +' ' + hourtext + '.';
  var en_twitter = 'The #TSW servers will come down for ' + updatenumber + 'on ' + months['en'][values[0]] + ' ' + values[1] + ', at ' + values[3] + ':' + values[7] + ' GMT/ ' + edt + ':' + values[7] + ampm +' EDT. The downtime is estimated to take  ' +  + values[4] +' ' + hourtext + '.';
  var en_aolauncher = 'The servers will come down for ' + updatenumber + ' on ' + months['en'][values[0]] + ' ' + values[1] + ', at ' + values[3] + ':' + values[7] + ' GMT/ ' + edt + ':' + values[7] + ampm +' EDT/ ' + pdt + ':' + values[7] + pampm + ' PDT.(&lt;a href="';
  var en_aolauncher2 = '"&gt;  check this link to see when this is in your timezone)&lt;/a&gt;.  The downtime is estimated to take  '  + values[4] +' ' + hourtext + '.';
  var en_aolauncher3 = 'Server Update - ';
  /*French Generation */
  var fr_output = '&ltbr&gt;» Date: ' + a_date + ' ' + months['fr'][values[0]] + ', ' + cet + 'h' + values[7] + ' (Paris) / ' + edt + 'h' + values[7] + ' (Quebec) &ltbr&gt;» Durée : '  + values[4] +' ' + frhourtext + '. &ltbr&gt;» Mise à jour : ' + frupdatenumber + '&ltbr&gt;';
  var fr_twitter = 'Le ' + a_date + ' ' + months['fr'][values[0]] + ' , les serveurs seront hors ligne à partir de ' + cet + 'h' + values[7] + campm + ' (Paris) / ' + edt + 'h' + values[7] + ampm +'(Quebec) ' + type['fr'][values[2]] + ' Durée: ' +  values[4] + ' ' + frhourtext + '.';
  var fr_subject = 'Maintenance des serveurs ' + a_date + ' ' + months['fr'][values[0]];
  var fr_forum = 'Le ' + a_date + ' ' + months['fr'][values[0]] + ', les serveurs seront hors ligne à partir de ' + cet + 'h' + values[7] + campm + ' (Paris)/ ' + edt + 'h' + values[7] + ampm + '(Quebec). ' + type['fr'][values[2]] + '. Durée de maintenance estimée  ' + values[4] + ' ' + frhourtext + '.';

  /*German Generation*/
  var de_output = '&ltbr&gt;» Datum: ' + a_date + ' ' + months['de'][values[0]] + ', ' + cet + ':' + values[7] + ' Uhr &ltbr&gt;» Dauer:   ' + values[4] +' ' + dehourtext + '&ltbr&gt;» Version: ' + deupdatenumber + '&ltbr&gt;';
  var de_twitter = 'am ' + a_date + '. ' + months['de'][values[0]] + ' um ' + cet + ':' + values[7] + ' CET Uhr, werden die Server für ' + type['de'][values[2]] + ' heruntergefahren.(Dauer ca ' + values[4] +' ' + dehourtext + '.)';
  var de_subject = 'am ' + a_date + '. ' + months['de'][values[0]] + ' ' + '2015';
  var de_forum = 'am ' + a_date + '. ' + months['de'][values[0]] + ' um ' + cet + ':' + values[7] + ' Uhr, werden die Server für ' + type['de'][values[2]] + ' heruntergefahren.(Dauer ca ' + values[4] +' ' + dehourtext + '.)';

 
  /*This puts that info into the page*/
  $('.english').html(en_output);
  $('.ensubject').html(en_subject);
  $('.enForum').html(en_forum + anchor + enforum2);
  $('.en_aoLauncher').html(en_aolauncher + anchor + en_aolauncher2);
  $('.en_aoSubject').html(en_aolauncher3 + en_subject);
  $('.en_aoForum').html(en_aolauncher + anchor + en_aolauncher2);
  $('.enTwitter').html(en_twitter);
  $('.french').html(fr_output);
  $('.frsubject').html(fr_subject);
  $('.frForum').html(fr_forum);
  $('.frTwitter').html(fr_twitter);
  $('.german').html(de_output);
  $('.deTwitter').html(de_twitter);
  $('.desubject').html(de_subject);
  $('.deForum').html(de_forum);
  $('#output a').attr('href', anchor);
});