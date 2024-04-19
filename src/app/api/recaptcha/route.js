export async function POST(request, response) {
  const body = await request.json();
  const res = await fetch(`https://recaptchaenterprise.googleapis.com/v1/projects/costs-diary-1702121776196/assessments?key=${process.env.GOOGLE_RECAPTCHA_API_KEY}`, {
    method: "POST",
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return Response.json({ score: data?.riskAnalysis?.score });
}
