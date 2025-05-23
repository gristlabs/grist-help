---
title: Admin Controls
---

# Admin Controls

Grist Admin Controls provide a comprehensive view of users and resources in a Grist
installation. It is available on all Enterprise plans, whether managed by Grist Labs or hosted on your
own servers.

## Accessing Admin Controls

Admin Controls are only available to the Grist [installation
administrator](self-managed.md#what-is-the-administrative-account). When signed in as the
administrator on your site, open the Admin Panel either from the 'Grist Resources' section
in the bottom-left of the screen, or from the user dropdown menu.

*![Admin Panel in tools](images/admin-controls/admin-panel-in-tools.png)*
{: .screenshot-half }

*![Admin Panel in user menu](images/admin-controls/admin-panel-in-user-menu.png)*
{: .screenshot-half }

The Admin Panel opens to the _Installation_ page, where you can configure installation settings. The left-side panel also lists 'Admin Controls', with pages for _Users_, _Orgs_, _Workspaces_,
and _Documents_.

*![Admin area pages](images/admin-controls/admin-area-pages.png)*
{: .screenshot-half }

## Users page

The _Users_ page lists all users in your installation. Details include:

- `Name`
- `Email`
- `First Login`: when the user signed in for the first time.
- `Last Connection`: the last time the user connected.
- `API Key`: whether the user created an API key (the actual API key is not shown).
- `Orgs` / `Workspaces` / `Docs`: how many of each type of resource this user has access to.

Click on the link in the **Name** column, or use the 'Show details' button to expand details for the
selected user. You can also open details by pressing <code class="keys">*Space*</code> key. Details
include a card with the user information, and listings of organizations, workspaces, and
documents which this user can access. Each row shows the access level the user has to that
resource, and details for the resource.

*![users-page-with-details](images/admin-controls/users-page-with-details.png)*

### Removing a user

A special action available on the _Users_ page is 'Remove user'. This is available under the 'Actions' button at the upper-right of the expanded user details card, or in the row or cell context menus as an 'Actions > Remove user' item.

*![remove-user-in-action-button](images/admin-controls/remove-user-in-action-button.png)*
{: .screenshot-half }

*![remove-user-in-row-menu](images/admin-controls/remove-user-in-row-menu.png)*
{: .screenshot-half }

Removing a user deletes that user entirely from everywhere on your site. This operation cannot be
reverted. You have to confirm the deletion by typing in the user's email address.

<span class="screenshot-large">*![delete-account](images/admin-controls/delete-account.png)*</span>
{: .screenshot-half }

If the user owns team-site resources, you'll have the option to assign a different user to take over their owner-level access. By default,
you (the installation administrator) will become an owner on all such resources.

<span class="screenshot-large">*![delete-account-with-selector](images/admin-controls/delete-account-with-selector.png)*</span>
{: .screenshot-half }

Note that the user's personal site (supported on some configurations), including all workspaces
and documents in it, will be deleted entirely when a user is removed. There is no option to
preserve personal site materials when removing a user. To preserve documents, the user to be
removed can [transfer their documents](FAQ.md#can-i-move-documents-between-sites) to a team site
_before_ they are removed.

## Resources

The remaining three pages list the three types of resources that users may access:
organizations, workspaces, and documents.

### Organizations

Grist allows a single installation to host multiple "organizations", also called "team sites",
each with its own set of team members, workspaces, and documents. It is most common for an
Enterprise account to have just a single team site, but Admin Controls includes a listing of
organizations whether there is one or several.

In addition, every user by default has an associated "personal site", which is just another
organization with a single member.

The _Orgs_ page lists all organizations in your installation. In addition to basic info, it shows
the number of workspaces, documents, and users in the organization. The **Guests** column shows
the count of users who are not members of the organization but have been given access to one of
the documents within it.

### Workspaces

An organization consists of workspaces, which contain Grist documents. The _Workspaces_ page lists
all workspaces across all organizations, including personal sites. Along with basic details, it shows the number of documents in each workspace and the users with access.

The **Guests** column displays the number of users who are not members of the organization but have been
given access to a document within this workspace.

In addition, the column **Extra Doc Users** displays the number of organization members who have not been
given access to this workspace but have been given access to at least one of the documents in it.

### Documents

A document is the core component of Grist. The _Documents_ page lists all documents across all
organizations, including personal sites. Along with basic details, it provides additional relevant information:

- `Users`: how many organization members have access to this document.
- `Guests`: how many users outside the organization have access to this document.
- `Public`: is this document [publicly link-shared](sharing.md#public-access-and-link-sharing) (can be opened by anyone who has the link).
- `Usage Rows`, `Usage Data Bytes`, `Usage Attachment Bytes`: document
  usage data, as shown in the Raw Data page (see [Usage](raw-data.md#usage)). It is not real-time,
  but is updated periodically while a document is open.

*![docs-page](images/admin-controls/docs-page.png)*

### Shared functionality for all resources

The pages for all three types of resources share common functionality.

To view more details about a selected resource, click the link in the **Name** column, use the 'Show details' button, or press the <code
class="keys">*Space*</code> shortcut.

In the expanded section, you'll find additional resource details, a list of users with access, and lists of contained material. For an organization, this includes its workspaces and documents, while for a workspace, it includes its documents.

The 'Users' tab displays all users with access to the selected resource, with their access level shown
in the first column.

*![orgs-with-details](images/admin-controls/orgs-with-details.png)*

All tables support Grist's standard [sorting and filtering](search-sort-filter.md) features. You can also resize and reorder columns, but these view changes will not be saved.

Two actions, 'Open document' and 'View sharing', are available for each resource. These may be accessed from the 'Actions' button when the details card is expanded, or from the row menu or cell context menu in the main resource list.

*![resource-actions-in-row-menu](images/admin-controls/resource-actions-in-row-menu.png)*
{: .screenshot-half }

The action `Open organization` / `Open workspace` / `Open document` opens the given resource in a new
page. Note that normal permissions apply. If you have not been
added to this resource, you will see an 'Access denied' or 'Not found' page.

*![resource-actions-in-action-button](images/admin-controls/resource-actions-in-action-button.png)*
{: .screenshot-half }

The action `View sharing` opens the sharing dialog for the resource in view-only mode. It does
not allow access changes. It provides data similar to what is available in the 'Users' tab, presented in an interface similar to the standard Grist sharing dialog.
