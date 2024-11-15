---
title: AWS Marketplace
---

AWS Marketplace {: .tag-core .tag-ee }
============

!!! warning "Note"
    This documentation refers to an upcoming version of Grist on the AWS Marketplace. The documentation for the soon-to-be legacy version [is available here](../aws-marketplace-legacy).


[Grist Builder Edition](https://aws.amazon.com/marketplace/pp/prodview-tew3ygop5xxy4) on the AWS Marketplace has everything you need to run a self-hosted Grist instance with minimal setup. Below are the initial configuration steps.

### How to log in to the Grist instance

During deployment, you should have been asked about creating or using key pairs. You can use this pair to log in via SSH from your terminal/bash. The default user for the Grist EC2 instance is named “ubuntu”, and you can log in to `ubuntu@[ec2-instance-public-ip]`.

**Note:** You need to use the `*.pem` file you received while generating key pairs on AWS. Details about connecting via SSH can be found in the following places: 

* Windows: [https://learn.microsoft.com/en-us/windows/terminal/tutorials/ssh](https://learn.microsoft.com/en-us/windows/terminal/tutorials/ssh)
* Linux: [https://www.ssh.com/academy/ssh/command](https://www.ssh.com/academy/ssh/command)
* macOS: [https://www.servermania.com/kb/articles/ssh-mac](https://www.servermania.com/kb/articles/ssh-mac)

If you don’t want to connect via SSH, AWS provides the option to connect from within the AWS console using the “Connect” button:

![AWS Connect screenshot](../images/aws-connect.png)

Once you log in, follow the instructions displayed in the console.

## Authentication setup

In addition to username and password logins via [Authelia](https://www.authelia.com/), we also support Google or Microsoft as OpenID providers. For configuring other authentication providers, please refer to the [dex documentation](https://dexidp.io/docs/getting-started/).

To configure Grist authentication with Google or Microsoft, you must have an application registered with the corresponding provider:

* Microsoft: [https://learn.microsoft.com/en-us/power-pages/security/authentication/openid-settings](https://learn.microsoft.com/en-us/power-pages/security/authentication/openid-settings)
* Google: [https://support.google.com/cloud/answer/6158849?hl=en](https://support.google.com/cloud/answer/6158849?hl=en)

## Other important information 

* The Grist EC2 instance should have the “Persistent store” option checked.
* By default, Grist Builder Edition stores cryptographic authentication configuration and all data under `/home/grist/persist`. Deleting this folder will result in a loss of all data from all documents.
* If you are using the legacy version based on [Grist Omnibus](https://github.com/gristlabs/grist-omnibus), please refer to the [legacy documentation](../aws-marketplace-legacy).
