import flask
import flask_wtf
import wtforms

import auth
import model
import util

from main import app

class FaqUpdateForm(flask_wtf.FlaskForm):
  question = wtforms.TextAreaField('Question', [wtforms.validators.required()])
  answer = wtforms.TextAreaField('Answer', [wtforms.validators.required()])
  category = wtforms.SelectField('Category', [wtforms.validators.required()], choices=[('About/History','About/History'),('Financials','Financials'),('The Physical Space','The Physical Space'),('Other Hackerspaces','Other Hackerspaces'),('Paperwork and Logistics','Paperwork and Logistics'),('Miscellaneous','Miscellaneous')])

@app.route('/faqs/create/', methods=['GET', 'POST'])
@auth.login_required
def faq_create():
	form = FaqUpdateForm()
	if form.validate_on_submit():
		faq_db = model.Faq(
			user_key=auth.current_user_key(),
			question=form.question.data,
			answer=form.answer.data,
			category=form.category.data,
		)
		faq_db.put()
		return flask.redirect(flask.url_for('welcome'))
	return flask.render_template(
		'faq_create.html',
		html_class='faq-create',
		title='Create FAQ',
		form=form,
	)