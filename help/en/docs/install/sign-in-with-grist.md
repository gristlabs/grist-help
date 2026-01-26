---
title: Sign in with getgrist.com
---

# Sign in with getgrist.com {: .tag-core .tag-ee }

Sign in with getgrist.com allows users on your Grist server to sign in using their account on getgrist.com, the cloud version of Grist managed by Grist Labs.

When signing in, users will be redirected to the getgrist.com login page to log in or register.

<span class="screenshot-full">*![sign-in-with-grist-login](../images/sign-in-with-grist/sign-in-with-grist-login.png)*</span>
{: .screenshot-half }

After authenticating on getgrist.com, they'll be redirected back to your Grist server and signed in as the user they authenticated as.

## Setting up Sign in with getgrist.com

### Prerequisites

To set up Sign in with getgrist.com, you must have [administrator access](../../self-managed/#what-is-the-administrative-account) on your Grist installation. You must also have [registered for an account on getgrist.com](https://login.getgrist.com/signup).

!!! warning "**Setting up authentication may impact your administrator access**"
    If you are not able to sign in on getgrist.com with an account whose email matches one of the administrators on your Grist installation, you will no longer be able to sign in as an administrator.

    You must [set the installation admin](../../self-managed/#what-is-the-administrative-account) to an email you can authenticate as to retain administrator access.

### Step 1: Open the Admin Panel

1. Sign in to your Grist installation as an administrator.
2. Navigate to the **Admin Panel**.
3. Under **Security Settings**, expand the **Authentication** section.

<span class="screenshot-full">*![admin-panel-authentication](../images/admin-panel/admin-panel-authentication.png)*</span>
{: .screenshot-half }

### Step 2: Start configuring getgrist.com authentication

1. Under **Sign in with getgrist.com**, click the **Configure** button.
2. In the dialog that appears, click **Register your Grist server**.

<span class="screenshot-full">*![admin-panel-register-server](../images/admin-panel/admin-panel-register-server.png)*</span>
{: .screenshot-half }

### Step 3: Register your Grist server

1. If required, sign in or register for a new account.
2. Fill out the owner, server name, and server URL:
3. Submit the form.

<span class="screenshot-full">*![sign-in-with-grist-register-server](../images/sign-in-with-grist/sign-in-with-grist-register-server.png)*</span>
{: .screenshot-half }

### Step 4: Copy the secret

Copy the secret shown at the end of the form to your clipboard.

<span class="screenshot-full">*![sign-in-with-grist-secret](../images/sign-in-with-grist/sign-in-with-grist-secret.png)*</span>
{: .screenshot-half }

### Step 5: Finish configuring getgrist.com authentication

1. Return to the dialog from step 2.
2. Paste the secret into the configuration key field.
3. Click **Configure**.

!!! note "Note"
    If you are changing from a different authentication method, you must also click **Set as active method** under **Sign in with getgrist.com** and click **Confirm**.

### Step 6: Restart your Grist server

1. Restart your Grist server.
2. Upon restart, Sign in with getgrist.com will be the active authentication method.

<span class="screenshot-full">*![admin-panel-restart](../images/admin-panel/admin-panel-restart.png)*</span>
{: .screenshot-half }
