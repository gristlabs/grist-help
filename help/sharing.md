# Sharing

To collaborate in Grist, you invite other users to a document. For team plans,
you can also add users to your team site, or to a workspace (see
[Team Sharing](team-sharing.md)).

When a document is open, find the sharing icon
(<span class="grist-icon" style="--icon: var(--icon-Share)"></span>)
on the top right of the screen. It opens the menu with sharing and export
options. Select "Manage Users".

![sharing-doc-menu](images/sharing/sharing-doc-menu.png)

This option is also available in the Grist home page, if you click the three-dots icon to the right of a document's name.

![sharing-doclist-menu](images/sharing/sharing-doclist-menu.png)

If the "Manage Users" item is greyed out, it means you don't have permission to
view or manage the sharing settings for this document.

The sharing dialog that opens lists the users that have access to this
document. To add a user, enter that user's email address and hit Enter or click
"Invite new member" in the dropdown.

![sharing-add-user](images/sharing/sharing-add-user.png)

You may choose a role for any invited user, and click Confirm to save the changes and send any invitations.

![sharing-roles](images/sharing/sharing-roles.png)

There are three primary roles supported by Grist:

- **Viewer**: allows a user to view the document, but not make any changes to
  it. Some operations like sorting and filtering will work without affecting
  other users of the document. This role is set by default when you type in an email address.

- **Editor**: allows a user to view or make changes to the document data, structure, or formulas,
  but not to its sharing settings.

- **Owner**: gives a user complete permissions to the document, including to view and change its
  sharing settings. A document may have one or more owners. If you can open the
  "Manage Users" dialog, you have the "owner" role. You may not change your own
  access, but your access may be reduced or removed by another owner.


The option to inherit access does not affect individual plans, and is explained
in the [Team Sharing](team-sharing.md) article.
