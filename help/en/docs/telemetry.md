---
title: Overview of telemetry
---

# Overview of Telemetry

Grist development is guided by telemetry: a set of measurements
aimed at quantifying aspects of how Grist is used. A self-managed
installation of Grist by default does no telemetry.
When telemetry is enabled, data about usage is sent to a service
maintained by Grist Labs.

Telemetry may be configured by optional environment variables:

  * `GRIST_TELEMETRY_LEVEL`. This may be `off`, `limited`,
    or `full`. The default is `off`. A setting of `limited` or
	`full` results in data being sent to a service operated by
	Grist Labs. We encourage users to set telemetry to `limited`
	so that their usage counts, and guides Grist development.
	We only recommend a `full` setting if you have used
	`GRIST_TELEMETRY_URL` to redirect telemetry to a service
	you control. It includes identifiers internal to your installation
	that we would rather not know.
  * `GRIST_TELEMETRY_URL`. This controls where telemetry is
	sent. It defaults to a service operated by Grist Labs.
	If you are running a large hosted service, you may wish to
	direct telemetry to a service you control.

Telemetry may also be configured interactively by the owner of
a Grist installation, see [How do I control telemetry?](self-managed.md#how-do-i-control-telemetry) for details.

The `limited` setting results in some coarse-grained telemetry. This
level is intended for an installation of Grist that has opted in to
providing telemetry. The goal is to understand how Grist is used “in
the wild” in terms of feature use and resource counts, without sharing
any business data or personal identifiable information. See [limited
telemetry](telemetry-limited.md) for details of exactly what is sent.

The `full` setting gives relatively fine-grained telemetry. This level
is intended for large hosted services, such as that run by Grist
Labs. More information is logged, to facilitate running the service
and developing the product. No personal identifiable information is
included. Opaque identifiers are included which, on need (for example
in a service outage) could be related to personal information through
non-telemetric stores.  See [full telemetry](telemetry-full.md) for
details of exactly what is sent.

