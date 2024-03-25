export default function handler(request, response) {
  fetch(`https://recaptchaenterprise.googleapis.com/v1/projects/costs-diary-1702121776196/assessments?key=${process.env.GOOGLE_RECAPTCHA_API_KEY}`, {
    method: "POST",
    body: JSON.stringify(request.body),
  })
    .then((res) => res.json())
    .then((res) => response.status(200).json({ score: res.riskAnalysis.score }))
    .catch((error) => response.status(500).send(error));
}
