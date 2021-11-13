<script>
    import {supabase} from '../../lib/supabase'
    let mail = '';
    let email = '';
    let password = '';
    const handleSignIn = (event) => {
        supabase.auth.signIn({
        email: email,
        password: password
        }).then((data) => {
            console.log("Data", data)
        }).catch((err) => {
            console.error(err);
        })
    }
    const handleSignUp = (event) => {
        console.log("handleSignUp", event)
        supabase.auth.signIn({
        email: mail
        }).then((data) => {
            console.log("Data", data)
        }).catch((err) => {
            console.error(err);
        })
    }
    const logOut = () => {
        supabase.auth.signOut().then(() => {
            console.log("Logged Out!")
        }).catch((err) => {
            console.error(err)
        })
    }
</script>



<div class="box1 flex flex-col h-full justify-center">
    <section class="py-12">
      <div class="flex flex-wrap -mx-6">
        <div class="w-full lg:w-1/2 px-6 mb-8 lg:mb-0">
          <form on:submit|preventDefault={handleSignIn} class="w-full max-w-sm mx-auto" id='log-in'>
            <h2 class="text-3xl text-center mb-6 font-semibold font-heading">Sign In</h2>
            <div class="mb-4">
              <input bind:value={email} class="input" type="email" placeholder="Email"/>
            </div>
            <div class="mb-4">
              <input bind:value={password} class="input" type="password" placeholder="Password"/>
            </div>
            <div class="mb-6">
              <button type="submit" class="button" disabled={email === '' || password === ''}>Submit</button>
            </div>
          </form>
        </div>
        <div class="w-full lg:w-1/2 px-6 mb-8 lg:mb-0 lg:border-l">
          <h2 class="text-3xl text-center mb-6 font-semibold font-heading">Magic Link</h2>
          <form on:submit|preventDefault={handleSignUp} class="w-full max-w-sm mx-auto" id='sign-up'>
            <div class="mb-4 text-sm font-light p-2 text-gray-400 border rounded">
              
                    Get a passwordless link which you can use to redeem an access_token
                
              </div>
            <div class="mb-4">
              <input bind:value={mail} class="input" type="email" placeholder="Email"/>
            </div>
            <div class="mb-4">
              <button type="submit" class="button" disabled={mail === ''}>Get Link</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>


  <style>
    /* your styles go here */
</style>