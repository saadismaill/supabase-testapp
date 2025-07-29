const SUPABASE_URL = "https://jsjwzqgkvqlnqbpuxazy.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impzand6cWdrdnFsbnFicHV4YXp5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM4MjAzNTEsImV4cCI6MjA2OTM5NjM1MX0.rEO7kIk67tngQBsHnSg1ieh5aMnInN1HX5-cpMz8bv4";

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

function show(elementId) {
  document.getElementById("signup-form").classList.add("hidden");
  document.getElementById("signin-form").classList.add("hidden");
  document.getElementById("dashboard").classList.add("hidden");

  document.getElementById(elementId).classList.remove("hidden");
}

async function signUp() {
  const email = document.getElementById("signup-email").value;
  const password = document.getElementById("signup-password").value;

  const { error } = await client.auth.signUp({ email, password });

  if (error) {
    Swal.fire(" Sign Up Failed", error.message, "error");
  } else {
    Swal.fire("✅ Account Created", "Now please login.", "success");
    show("signin-form");
  }
}

async function signIn() {
  const email = document.getElementById("signin-email").value;
  const password = document.getElementById("signin-password").value;

  const { data, error } = await client.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    Swal.fire(" Sign In Failed", error.message, "error");
  } else {
    Swal.fire(" Welcome", "You are logged in!", "success");
    document.getElementById(
      "user-email"
    ).innerText = `Logged in as: ${data.user.email}`;
    show("dashboard");
  }
}

async function logout() {
  const { error } = await client.auth.signOut();

  if (error) {
    Swal.fire(" Error", error.message, "warning");
  } else {
    Swal.fire(" Logged Out", "See you soon!", "info");
    show("signin-form");
  }
}
