# Register to be a Grist consultant

<style>
  .creg-form {
    line-height: initial;
  }
  .form-group .control-label {
    font-weight: normal;
  }
  .creg-button {
    margin: 24px 0;
    background-color: #11b683;
    border: none;
    color: white;
  }
  .creg-button:hover {
    background-color: #009058;
    border: none;
    color: white;
  }
  #creg-submitted, #creg-error {
    display: none;
    margin-top: 40px;
  }
</style>

Are you a freelancer? Do you enjoy building in Grist and organizing data? We'd be
glad to support you, and to add you to our list of independent Grist consultants.

Please fill out the information below, and we'll get in touch with you.

<form id="creg-form" class="creg-form form-horizontal" method="post" action="https://docs.getgrist.com/api/docs/8QLoX2eUTJS1/tables/FormResponses/data">
<div class="form-group">
  <label class="col-sm-2 control-label" for="first_name">
  Your Name:
  </label>
  <div class="col-sm-5">
    <input class="form-control" type="text" id="first_name" name="first_name" placeholder="First Name" required>
  </div>
  <div class="col-sm-5">
    <input class="form-control" type="text" id="last_name" name="last_name" placeholder="Last Name" required>
  </div>
</div>
<div class="form-group">
  <label class="col-sm-2 control-label" for="email">
  Email:
  </label>
  <div class="col-sm-10">
    <input class="form-control" type="email" id="email" name="email" required>
  </div>
</div>
<div class="form-group">
  <label class="col-sm-2 control-label" for="phone">
  Phone:
  </label>
  <div class="col-sm-10">
    <input class="form-control" type="text" id="phone" name="phone">
  </div>
</div>
<div class="form-group">
  <label class="col-sm-2 control-label" for="company">
  Company:
  </label>
  <div class="col-sm-10">
    <input class="form-control" type="text" id="company" name="company">
  </div>
</div>
<div class="form-group">
  <label class="col-sm-2 control-label" for="website">
  Website:
  </label>
  <div class="col-sm-10">
    <input class="form-control" type="text" id="website" name="website">
  </div>
</div>
<div class="form-group">
  <div class="col-sm-10 col-sm-offset-2">
  Your technical background:
  </div>
</div>
<div class="form-group">
  <label class="col-sm-2 control-label" for="skill_excel">
  Excel:
  </label>
  <div class="col-sm-10">
  <label class="radio-inline"><input type="radio" name="skill_excel" value="none"> None</label>
  <label class="radio-inline"><input type="radio" name="skill_excel" value="beginner"> Beginner</label>
  <label class="radio-inline"><input type="radio" name="skill_excel" value="intermediate"> Intermediate</label>
  <label class="radio-inline"><input type="radio" name="skill_excel" value="advanced"> Advanced</label>
  </div>
</div>
<div class="form-group">
  <label class="col-sm-2 control-label" for="skill_sql">
  SQL:
  </label>
  <div class="col-sm-10">
  <label class="radio-inline"><input type="radio" name="skill_sql" value="none"> None</label>
  <label class="radio-inline"><input type="radio" name="skill_sql" value="beginner"> Beginner</label>
  <label class="radio-inline"><input type="radio" name="skill_sql" value="intermediate"> Intermediate</label>
  <label class="radio-inline"><input type="radio" name="skill_sql" value="advanced"> Advanced</label>
  </div>
</div>
<div class="form-group">
  <label class="col-sm-2 control-label" for="skill_python">
  Python:
  </label>
  <div class="col-sm-10">
  <label class="radio-inline"><input type="radio" name="skill_python" value="none"> None</label>
  <label class="radio-inline"><input type="radio" name="skill_python" value="beginner"> Beginner</label>
  <label class="radio-inline"><input type="radio" name="skill_python" value="intermediate"> Intermediate</label>
  <label class="radio-inline"><input type="radio" name="skill_python" value="advanced"> Advanced</label>
  </div>
</div>
<div class="form-group">
  <label class="col-sm-2 control-label" for="skill_javascript">
  Javascript:
  </label>
  <div class="col-sm-10">
  <label class="radio-inline"><input type="radio" name="skill_javascript" value="none"> None</label>
  <label class="radio-inline"><input type="radio" name="skill_javascript" value="beginner"> Beginner</label>
  <label class="radio-inline"><input type="radio" name="skill_javascript" value="intermediate"> Intermediate</label>
  <label class="radio-inline"><input type="radio" name="skill_javascript" value="advanced"> Advanced</label>
  </div>
</div>
<div class="form-group">
  <label class="col-sm-2 control-label" for="skill_grist">
  Grist:
  </label>
  <div class="col-sm-10">
  <label class="radio-inline"><input type="radio" name="skill_grist" value="none"> None</label>
  <label class="radio-inline"><input type="radio" name="skill_grist" value="beginner"> Beginner</label>
  <label class="radio-inline"><input type="radio" name="skill_grist" value="intermediate"> Intermediate</label>
  <label class="radio-inline"><input type="radio" name="skill_grist" value="advanced"> Advanced</label>
  </div>
</div>
<div class="form-group">
  <label class="col-sm-6 control-label" for="grist">
  Are you interested in receiving Grist training?
  </label>
  <div class="col-sm-6">
  <label class="checkbox-inline"><input type="checkbox" name="want_training" value="yes"> Interested</label>
  </div>
</div>
<div class="form-group">
  <div class="col-sm-12">
  <button type="submit" class="btn btn-default btn-lg creg-button">Submit</button>
  </div>
</div>
</form>

<div id="creg-submitted">
Thank you for registering! We'll be in touch. Meanwhile, you are welcome to reach out to us with any
questions, at <a href="mailto:support@getgrist.com">support@getgrist.com</a>.
</div>

<div id="creg-error">
<div id="creg-error-message">Could not submit the form.</div>
<div>
  <button type="submit" class="btn btn-default btn-lg creg-button" onclick="window.location.reload()">Try again</button>
</div>
</div>

<script>
function formDataToObj(formElem) {
  const formData = new FormData(formElem);
  const data = {};
  for (const pair of formData.entries()) {
    if (typeof pair[1] === 'string') {
      data[pair[0]] = [pair[1]];
    }
  }
  return data;
}

const form = document.getElementById('creg-form');
form.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const data = formDataToObj(form);
  const options = {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
    }
  };
  window.fetch(form.action, options)
  .then(resp => {
    return resp.json()
    .then(body => {
      console.log("BODY", body);
      if (resp.status !== 200) { throw new Error("Could not submit the form: " + (body && body.error || "unknown error")); }
      console.log("Form submitted", body);
      document.getElementById('creg-form').style.display = 'none';
      document.getElementById('creg-submitted').style.display = 'block';
    })
  })
  .catch(err => {
    console.warn("ERROR", err);
    document.getElementById('creg-form').style.display = 'none';
    document.getElementById('creg-error-message').textContent = String(err);
    document.getElementById('creg-error').style.display = 'block';
  });
});
</script>
