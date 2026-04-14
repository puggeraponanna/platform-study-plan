// ── State ──────────────────────────────────────────────────────────────────
const COLS = ['todo', 'inprogress', 'review', 'done'];

function uid() { return Math.random().toString(36).slice(2, 9); }

const SEED_CARDS = [
  // ── PHASE 1: LINUX & NETWORKING (Days 1-7) ──────────────────────────────
  { id: uid(), col: 'todo', subject: 'Linux', title: 'Day 1: Process Control (ps/kill)', desc: 'Learn signal handling (SIGTERM vs SIGKILL) and nested process tree inspection.', time: '1h', priority: 'medium', resources: [
    {label: 'DigitalOcean: Linux Process Management', url: 'https://www.digitalocean.com/community/tutorials/linux-process-management-ps-stat-top-htop-and-kill'},
    {label: 'Linux Journey: Processes', url: 'https://linuxjourney.com/lesson/monitor-processes-ps'}
  ]},
  { id: uid(), col: 'todo', subject: 'Linux', title: 'Day 1: systemd Unit Files', desc: 'Learn to write and debug custom .service files (ExecStart, Restart=always).', time: '1h', priority: 'medium', resources: [
    {label: 'DigitalOcean: Systemd Unit Files Guide', url: 'https://www.digitalocean.com/community/tutorials/understanding-systemd-units-and-unit-files'},
    {label: 'Linode: Intro to systemd', url: 'https://www.linode.com/docs/guides/introduction-to-systemd/'}
  ]},
  { id: uid(), col: 'todo', subject: 'Linux', title: 'Day 2: journalctl Filtering', desc: 'Master -u (unit), -p (priority), and --since filters for efficient debugging.', time: '1h', priority: 'medium', resources: [
    {label: 'DigitalOcean: How To Use Journalctl', url: 'https://www.digitalocean.com/community/tutorials/how-to-use-journalctl-to-view-and-manipulate-systemd-logs'},
    {label: 'Loggly: Journalctl Cheat Sheet', url: 'https://www.loggly.com/ultimate-guide/using-journalctl/'}
  ]},
  { id: uid(), col: 'todo', subject: 'Linux', title: 'Day 2: chmod/chown/ACLs', desc: 'Deep dive into numeric modes vs symbolic, and setfacl for complex permissions.', time: '1h', priority: 'medium', resources: [
    {label: 'RedHat: Manage File Permissions', url: 'https://www.redhat.com/sysadmin/linux-file-permissions-explained'},
    {label: 'Linux Journey: Permissions', url: 'https://linuxjourney.com/lesson/file-permissions'}
  ]},
  { id: uid(), col: 'todo', subject: 'Linux', title: 'Day 3: Pipes & Redirections', desc: 'Practice stderr redirection (2>&1) and chaining awk/sed for log parsing.', time: '1h', priority: 'medium', resources: [
    {label: 'Guru99: Pipes and Redirection', url: 'https://www.guru99.com/linux-redirection.html'},
    {label: 'Ryans Tutorials: Redirects', url: 'https://ryanstutorials.net/linuxtutorial/piping.php'}
  ]},
  { id: uid(), col: 'todo', subject: 'Linux', title: 'Day 3: Crontab & Automation', desc: 'Learn crontab syntax and edge cases (env vars in scripts).', time: '1h', priority: 'low', resources: [
    {label: 'Crontab.guru (Interactive Test)', url: 'https://crontab.guru/'},
    {label: 'OSTechNix: Cron Job Tutorial', url: 'https://ostechnix.com/a-beginners-guide-to-cron-jobs/'}
  ]},
  { id: uid(), col: 'todo', subject: 'Linux', title: 'Day 4: Finding Files (find/grep)', desc: 'Learn find -mtime, -exec, and grep recursive searches.', time: '1h', priority: 'medium', resources: [
    {label: 'DigitalOcean: Using Find and Locate', url: 'https://www.digitalocean.com/community/tutorials/how-to-use-find-and-locate-to-query-filenames-on-linux'},
    {label: 'Grep Recursively Guide', url: 'https://linuxize.com/post/how-to-grep-recursively/'}
  ]},
  { id: uid(), col: 'todo', subject: 'Networking', title: 'Day 4: DNS Resolution Chain', desc: 'Review Root/TLD/Authoritative layers and CNAME vs ALIAS vs A records.', time: '1h', priority: 'medium', resources: [
    {label: 'Cloudflare: What is DNS?', url: 'https://www.cloudflare.com/learning/dns/what-is-dns/'},
    {label: 'DNSimple: DNS Records Explained', url: 'https://support.dnsimple.com/articles/dns-records/'}
  ]},
  { id: uid(), col: 'todo', subject: 'Networking', title: 'Day 5: HTTP Status Codes', desc: 'Memorize common 4xx/5xx codes and when to use 301 vs 302 redirects.', time: '1h', priority: 'medium', resources: [
    {label: 'MDN: HTTP Status Codes', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Status'},
    {label: 'HTTPCats (Visual Guide)', url: 'https://http.cat/'}
  ]},
  { id: uid(), col: 'todo', subject: 'Networking', title: 'Day 5: TLS Handshake Basics', desc: 'Understand Cipher Suites and Certificate Authority (CA) validation flows.', time: '1h', priority: 'low', resources: [
    {label: 'Cloudflare: TLS Handshake', url: 'https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/'},
    {label: 'Illustrated TLS Guide', url: 'https://tls13.xargs.org/'}
  ]},
  { id: uid(), col: 'todo', subject: 'Networking', title: 'Day 6: Firewalls & SG Logic', desc: 'Practice Ingress/Egress rules and stateful vs stateless differences.', time: '1h', priority: 'medium', resources: [
    {label: 'AWS Documentation: Security Groups', url: 'https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html'},
    {label: 'DigitalOcean: Introduction to Firewalls', url: 'https://www.digitalocean.com/community/tutorials/what-is-a-firewall-and-how-does-it-work'}
  ]},
  { id: uid(), col: 'todo', subject: 'Networking', title: 'Day 6: cURL & Telnet Debugging', desc: 'Learn cURL -v, -I, and testing open ports with telnet/nc.', time: '1h', priority: 'medium', resources: [
    {label: 'Julia Evans: Networking Tools', url: 'https://jvns.ca/blog/2016/02/10/a-list-of-useful-networking-tools/'},
    {label: 'cURL Tutorial for Beginners', url: 'https://catonmat.net/cookbooks/curl'}
  ]},
  { id: uid(), col: 'todo', subject: 'Networking', title: 'Day 7: L4 vs L7 Balancing', desc: 'Review Path-based routing (L7) vs Connection-based routing (L4).', time: '1h', priority: 'medium', resources: [
    {label: 'Nginx: L4 vs L7 Load Balancing', url: 'https://www.nginx.com/resources/glossary/load-balancing/'},
    {label: 'DigitalOcean: Load Balancer Types', url: 'https://www.digitalocean.com/community/tutorials/what-is-load-balancing'}
  ]},

  // ── PHASE 2: AWS CORE & CLOUD DESIGN (Days 8-13) ──────────────────────────
  { id: uid(), col: 'todo', subject: 'AWS', title: 'Day 8: IAM Roles & Trust', desc: 'Design a cross-account IAM role with safe Trust relationships.', time: '1h', priority: 'high', resources: [
    {label: 'AWS Security Blog: Trust Policies', url: 'https://aws.amazon.com/blogs/security/how-to-use-trust-policies-with-iam-roles/'},
    {label: 'Medium: AWS IAM Trust Policy Guide', url: 'https://medium.com/@devops-engineer/aws-trust-policy-complete-guide-how-to-control-iam-role-access-in-2025-a1b2c3d4e5f6'}
  ]},
  { id: uid(), col: 'todo', subject: 'AWS', title: 'Day 8: VPC Subnet Design', desc: 'Plan Public/Private/Data subnets and NAT Gateway routes.', time: '1h', priority: 'high', resources: [
    {label: 'AWS Architecture Blog: VPC Design', url: 'https://aws.amazon.com/blogs/architecture/one-to-many-evolving-vpc-design/'},
    {label: 'PlainEnglish: Highly Available VPC', url: 'https://plainenglish.io/blog/415-how-i-designed-a-highly-available-vpc-architecture-in-aws-a-complete-step-by-step-breakdown'}
  ]},
  { id: uid(), col: 'todo', subject: 'AWS', title: 'Day 9: S3 Policies & Versioning', desc: 'Learn Bucket Policies, CORS, and enabling Versioning/MFA-Delete.', time: '1h', priority: 'medium', resources: [
    {label: 'AWS Docs: S3 Bucket Policies', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies.html'},
    {label: 'S3 Versioning Best Practices', url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html'}
  ]},
  { id: uid(), col: 'todo', subject: 'AWS', title: 'Day 9: ALB Target Health', desc: 'Configure Health Checks (Grace Period, Unhealthy Threshold) properly.', time: '1h', priority: 'medium', resources: [
    {label: 'AWS Docs: ALB Health Checks', url: 'https://docs.aws.amazon.com/elasticloadbalancing/latest/application/target-group-health-checks.html'},
    {label: 'TutorialsPoint: AWS ALB', url: 'https://www.tutorialspoint.com/amazon_web_services/amazon_web_services_elastic_load_balancing.htm'}
  ]},
  { id: uid(), col: 'todo', subject: 'AWS', title: 'Day 10: Secrets Manager & KMS', desc: 'Understand Encryption at Rest vs Transit and rotating secrets via Lambda.', time: '1h', priority: 'high', resources: [
    {label: 'AWS Docs: KMS Overview', url: 'https://docs.aws.amazon.com/kms/latest/developerguide/overview.html'},
    {label: 'Secrets Manager Rotation Guide', url: 'https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html'}
  ]},
  { id: uid(), col: 'todo', subject: 'AWS', title: 'Day 10: Route53 Records', desc: 'Practice A, AAAA, CNAME, and TXT record setup for custom domains.', time: '1h', priority: 'medium', resources: [
    {label: 'AWS Docs: Route 53 Records', url: 'https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/resource-record-sets-values.html'},
    {label: 'DigitalOcean: Intro to Route 53', url: 'https://www.digitalocean.com/community/tutorials/how-to-set-up-amazon-route-53-as-your-dns-provider'}
  ]},

  // ── PHASE 3: TERRAFORM & IAC (Days 11-13) ───────────────────────────────
  { id: uid(), col: 'todo', subject: 'Terraform', title: 'Day 11: Remote State S3+Dynamo', desc: 'Configure S3 backend with DynamoDB locking for team safety.', time: '1h', priority: 'high', resources: [
    {label: 'OneUptime: TF State Locking', url: 'https://oneuptime.com/blog/how-to-use-terraform-state-with-s3-backend-and-dynamodb-locking'},
    {label: 'Terrateam: Managing TF State', url: 'https://terrateam.io/blog/managing-terraform-state-on-aws-s3-backend-and-dynamodb-locking'}
  ]},
  { id: uid(), col: 'todo', subject: 'Terraform', title: 'Day 11: TF Module Basics', desc: 'Wrap a simple S3 bucket into a reusable module wrapper.', time: '1h', priority: 'high', resources: [
    {label: 'HashiCorp Learn: Terraform Modules', url: 'https://developer.hashicorp.com/terraform/tutorials/modules'},
    {label: 'Terraform Best Practices: Modules', url: 'https://www.terraform-best-practices.com/modules'}
  ]},
  { id: uid(), col: 'todo', subject: 'Terraform', title: 'Day 12: Vars & tfvars Files', desc: 'Learn precedence of variable definitions (ENV vs tfvars vs Default).', time: '1h', priority: 'medium', resources: [
    {label: 'Terraform: Input Variables', url: 'https://developer.hashicorp.com/terraform/language/values/variables'},
    {label: 'The Practical Guide to TF Vars', url: 'https://blog.gruntwork.io/a-comprehensive-guide-to-managing-secrets-in-your-terraform-code-1d58395131e5'}
  ]},
  { id: uid(), col: 'todo', subject: 'Terraform', title: 'Day 12: The for_each Loop', desc: 'Convert index-based `count` to key-based `for_each` for safety.', time: '1h', priority: 'medium', resources: [
    {label: 'HashiCorp: count vs for_each', url: 'https://developer.hashicorp.com/terraform/language/meta-arguments/for_each'},
    {label: 'SpaceLift: For Each in Terraform', url: 'https://spacelift.io/blog/terraform-for-each'}
  ]},
  { id: uid(), col: 'todo', subject: 'Terraform', title: 'Day 13: Data Sources usage', desc: 'Learn to pull existing infrastructure info (VPC IDs) via data blocks.', time: '1h', priority: 'medium', resources: [
    {label: 'Terraform: Data Sources', url: 'https://developer.hashicorp.com/terraform/language/data-sources'},
    {label: 'Data Sources Tutorial', url: 'https://www.terraform-best-practices.com/naming-conventions'}
  ]},
  { id: uid(), col: 'todo', subject: 'Terraform', title: 'Day 13: Terraform Import', desc: 'Practice taking manual resources into code via `terraform import`.', time: '1h', priority: 'medium', resources: [
    {label: 'HashiCorp: Import Resources', url: 'https://developer.hashicorp.com/terraform/cli/import'},
    {label: 'Hands-on TF Import Tutorial', url: 'https://www.terraform.io/cli/import'}
  ]},

  // ── PHASE 4: PYTHON AUTO (Days 14-19) ───────────────────────────────
  { id: uid(), col: 'todo', subject: 'Python', title: 'Day 14: Data Types & Control', desc: 'Practice list comprehensions and dict manipulations for cloud data.', time: '1h', priority: 'medium', resources: [
    {label: 'Real Python: Data Types', url: 'https://realpython.com/python-data-types/'},
    {label: 'Python List Comprehensions', url: 'https://realpython.com/list-comprehension-python/'}
  ]},
  { id: uid(), col: 'todo', subject: 'Python', title: 'Day 14: File JSON/YAML parsing', desc: 'Write a script to convert infrastructure YAML to JSON logs.', time: '1h', priority: 'medium', resources: [
    {label: 'Real Python: Read/Write Files', url: 'https://realpython.com/read-write-files-python/'},
    {label: 'Working with YAML in Python', url: 'https://realpython.com/python-yaml/'}
  ]},
  { id: uid(), col: 'todo', subject: 'Python', title: 'Day 15: subprocess Capturing', desc: 'Learn check_output vs run and handling shell=True dangers.', time: '1h', priority: 'medium', resources: [
    {label: 'Real Python: Subprocess', url: 'https://realpython.com/python-subprocess/'},
    {label: 'Python Subprocess Tutorial (Stack Abuse)', url: 'https://stackabuse.com/executing-shell-commands-with-python/'}
  ]},
  { id: uid(), col: 'todo', subject: 'Python', title: 'Day 15: argparse Flags/Env', desc: 'Build a CLI tool skeleton with --verbose and API_KEY env support.', time: '1h', priority: 'medium', resources: [
    {label: 'Real Python: Argparse', url: 'https://realpython.com/command-line-interfaces-python-argparse/'},
    {label: 'Python Docs: Argparse', url: 'https://docs.python.org/3/library/argparse.html'}
  ]},
  { id: uid(), col: 'todo', subject: 'Python', title: 'Day 16: requests & REST Auth', desc: 'Make authenticated calls to GitLab API via Bearer tokens.', time: '1h', priority: 'medium', resources: [
    {label: 'Real Python: Python Requests', url: 'https://realpython.com/python-requests/'},
    {label: 'GitLab API Auth Guide', url: 'https://docs.gitlab.com/ee/api/rest/'}
  ]},
  { id: uid(), col: 'todo', subject: 'Python', title: 'Day 17: boto3: Listing EC2 Tags', desc: 'Filter instances by "Project" tag using Boto3 Client & Resource.', time: '1h', priority: 'high', resources: [
    {label: 'CodeGive: Boto3 Filter by Tag', url: 'https://codegive.com/master-boto3-ec2-filter-by-tag-2024'},
    {label: 'Boto3 EC2 Examples', url: 'https://boto3.amazonaws.com/v1/documentation/api/latest/guide/ec2-example-managing-instances.html'}
  ]},
  { id: uid(), col: 'todo', subject: 'Python', title: 'Day 18: boto3: S3 Operations', desc: 'Upload, Download, and List objects with metadata using Python.', time: '1h', priority: 'medium', resources: [
    {label: 'Real Python: Boto3 and S3', url: 'https://realpython.com/python-boto3-s3/'},
    {label: 'Boto3 S3 Examples', url: 'https://boto3.amazonaws.com/v1/documentation/api/latest/guide/s3-example-creating-buckets.html'}
  ]},
  { id: uid(), col: 'todo', subject: 'Python', title: 'Day 19: Basic pytest mocks', desc: 'Learn to mock Boto3 calls so tests don\'t hit real AWS.', time: '1h', priority: 'low', resources: [
    {label: 'Real Python: Pytest Guide', url: 'https://realpython.com/pytest-python-testing/'},
    {label: 'Mocking Boto3 with Moto', url: 'http://docs.getmoto.org/en/latest/'}
  ]},

  // ── PHASE 5: KUBERNETES & DOCKER (Days 20-27) ──────────────────────────────
  { id: uid(), col: 'todo', subject: 'Docker', title: 'Day 20: Docker Image Optimization', desc: 'Use Multi-stage builds to reduce image size (Go/Node/Python).', time: '1h', priority: 'medium', resources: [
    {label: 'Docker Docs: Multi-stage builds', url: 'https://docs.docker.com/build/building/multi-stage/'},
    {label: 'Snyk: Docker Best Practices', url: 'https://snyk.io/blog/10-docker-image-security-best-practices/'}
  ]},
  { id: uid(), col: 'todo', subject: 'Docker', title: 'Day 21: Layer Caching mastery', desc: 'Order Dockerfile commands to maximize build-cache hits.', time: '1h', priority: 'medium', resources: [
    {label: 'Docker Docs: Build Cache', url: 'https://docs.docker.com/build/cache/'},
    {label: 'Medium: Mastering Docker Layer Caching', url: 'https://medium.com/@shubham.kumar_82/mastering-docker-layer-caching-a-practical-guide-5b1b1b1b1b1b'}
  ]},
  { id: uid(), col: 'todo', subject: 'K8s', title: 'Day 22: Deployments & Rollouts', desc: 'Understand RollingUpdate vs Recreate and rolling back versions.', time: '1h', priority: 'medium', resources: [
    {label: 'K8s Docs: Deployments', url: 'https://kubernetes.io/docs/concepts/workloads/controllers/deployment/'},
    {label: 'Visual Guide to K8s Deployments', url: 'https://www.youtube.com/watch?v=X48VuDVv0do'}
  ]},
  { id: uid(), col: 'todo', subject: 'K8s', title: 'Day 23: Services & Ingress', desc: 'Learn path-based routing via Ingress controller (Nginx/ALB).', time: '1h', priority: 'medium', resources: [
    {label: 'K8s Docs: Services', url: 'https://kubernetes.io/docs/concepts/services-networking/service/'},
    {label: 'Nginx Ingress Controller Guide', url: 'https://kubernetes.github.io/ingress-nginx/user-guide/basic-usage/'}
  ]},
  { id: uid(), col: 'todo', subject: 'K8s', title: 'Day 24: ConfigMaps & Mounts', desc: 'Mount config files as volumes vs Injecting as single Env vars.', time: '1h', priority: 'medium', resources: [
    {label: 'K8s Docs: ConfigMaps', url: 'https://kubernetes.io/docs/concepts/configuration/configmap/'},
    {label: 'ConfigMaps Hands-on', url: 'https://www.digitalocean.com/community/tutorials/how-to-use-configmaps-in-kubernetes'}
  ]},
  { id: uid(), col: 'todo', subject: 'K8s', title: 'Day 25: Secrets & Base64', desc: 'Learn safe secret handling and basic base64 validation.', time: '1h', priority: 'medium', resources: [
    {label: 'K8s Docs: Secrets', url: 'https://kubernetes.io/docs/concepts/configuration/secret/'},
    {label: 'Base64 Encoding Tool', url: 'https://www.base64encode.org/'}
  ]},
  { id: uid(), col: 'todo', subject: 'K8s', title: 'Day 26: Debugging CrashLoop', desc: 'Master logs --previous and describe for pod crashes.', time: '1h', priority: 'high', resources: [
    {label: 'PerfectScale: CrashLoopBackOff Guide', url: 'https://perfectscale.io/blog/crashloopbackoff-kubernetes-an-ultimate-guide'},
    {label: 'OneUptime: How to Debug K8s Pods', url: 'https://oneuptime.com/blog/how-to-debug-kubernetes-crashloopbackoff-errors'}
  ]},
  { id: uid(), col: 'todo', subject: 'K8s', title: 'Day 27: Helm Basics & Repos', desc: 'Install charts, update repos, and inspect chart values.yaml.', time: '1h', priority: 'medium', resources: [
    {label: 'Helm Docs: Intro', url: 'https://helm.sh/docs/intro/quickstart/'},
    {label: 'That DevOps Guy: Helm YouTube', url: 'https://www.youtube.com/watch?v=5gsHYdiD6v8'}
  ]},

  // ── PHASE 6: CI/CD & PLATFORM (Days 28-31) ──────────────────────────────
  { id: uid(), col: 'todo', subject: 'K8s', title: 'Day 28: RBAC Roles / Bindings', desc: 'Learn ClusterRoles vs Namespace Roles and giving dev access.', time: '1h', priority: 'medium', resources: [
    {label: 'K8s Docs: RBAC', url: 'https://kubernetes.io/docs/reference/access-authn-authz/rbac/'},
    {label: 'Bitnami: RBAC Tutorial', url: 'https://docs.bitnami.com/kubernetes/how-to/configure-rbac-in-your-kubernetes-cluster/'}
  ]},
  { id: uid(), col: 'todo', subject: 'CI/CD', title: 'Day 29: Jenkinsfile Stages', desc: 'Implement Checkout -> Test -> Build -> Push -> Deploy stages.', time: '1h', priority: 'medium', resources: [
    {label: 'Jenkins Docs: Pipeline', url: 'https://www.jenkins.io/doc/book/pipeline/'},
    {label: 'Best Practices for Jenkins Pipeline', url: 'https://www.cloudbees.com/blog/best-practices-jenkins-pipeline'}
  ]},
  { id: uid(), col: 'todo', subject: 'CI/CD', title: 'Day 30: GitLab include/extend', desc: 'Refactor complex YAML using parent templates for reuse.', time: '1h', priority: 'medium', resources: [
    {label: 'GitLab: CI/CD Templates', url: 'https://docs.gitlab.com/ee/ci/pipelines/pipeline_architectures.html'},
    {label: 'OneUptime: Include Templates', url: 'https://oneuptime.com/blog/how-to-use-include-templates-in-gitlab-ci'}
  ]},
  { id: uid(), col: 'todo', subject: 'CI/CD', title: 'Day 31: GitHub Actions Basics', desc: 'Create a simple workflow to run Linter on every PR.', time: '1h', priority: 'medium', resources: [
    {label: 'GitHub: Intro to Actions', url: 'https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions'},
    {label: 'Gitea: GitHub Actions Guide', url: 'https://docs.gitea.com/usage/actions/overview'}
  ]},

  // ── PHASE 7: INTERVIEW PREP & FINAL BRANDING (Days 32-40) ───────────────
  { id: uid(), col: 'todo', subject: 'Interview', title: 'Day 32: Technical Q&A: AWS/TF', desc: 'Prep: Scaling ALB, handling TF State drift, Multi-region strategies.', time: '1h', priority: 'high', resources: [
    {label: 'Datacamp: AWS Interview Questions', url: 'https://www.datacamp.com/blog/cloud-engineer-interview-questions'},
    {label: 'Terraform Interview Q&A', url: 'https://www.datacamp.com/blog/terraform-interview-questions'}
  ]},
  { id: uid(), col: 'todo', subject: 'Interview', title: 'Day 33: Technical Q&A: CI/K8s', desc: 'Prep: Canary vs Blue/Green, Troubleshooting ImagePullBackoff.', time: '1h', priority: 'high', resources: [
    {label: 'Platform Engineer Interview Questions', url: 'https://yardstick.team/interview-questions-by-role/platform-engineer'},
    {label: 'K8s Interview Questions', url: 'https://www.simplilearn.com/tutorials/kubernetes-tutorial/kubernetes-interview-questions'}
  ]},
  { id: uid(), col: 'todo', subject: 'Interview', title: 'Day 34: STAR Story: Automation Project', desc: 'Draft story: Biggest manual process you automated from scratch.', time: '1h', priority: 'high', resources: [
    {label: 'Indeed: STAR Method Guide', url: 'https://www.indeed.com/career-advice/interviewing/how-to-use-the-star-interview-response-technique'},
    {label: 'The Muse: STAR Method Example', url: 'https://www.themuse.com/advice/star-method-interview-question'}
  ]},
  { id: uid(), col: 'todo', subject: 'Interview', title: 'Day 35: STAR Story: Handling Crisis', desc: 'Draft story: Responding to prod outage or tooling failure.', time: '1h', priority: 'high', resources: [
    {label: 'STAR Story Worksheet', url: 'https://www.themuse.com/advice/star-method-interview-question'}
  ]},
  
  // BRANDING MOVED TO END
  { id: uid(), col: 'todo', subject: 'Branding', title: 'Day 36: Target Headline Update', desc: 'Craft final headline: "Platform Engineer | AWS | Terraform | CI/CD | Cloud Automation". Incorporate new project keywords.', time: '1h', priority: 'high', resources: [
    {label: 'Platform Engineering Org: Career Paths', url: 'https://platformengineering.org/blog/from-devops-to-platform-engineering'},
    {label: 'LinkedIn: Headline Best Practices', url: 'https://www.linkedin.com/business/talent/blog/product-tips/how-to-write-a-linkedIn-headline'}
  ]},
  { id: uid(), col: 'todo', subject: 'Branding', title: 'Day 37: Summary Section Rewrite', desc: 'Final polish: Lead with your 6+ years experience plus specific new automation projects.', time: '1h', priority: 'high', resources: [
    {label: 'Source Plan', url: R.sourceDoc}
  ]},
  { id: uid(), col: 'todo', subject: 'Branding', title: 'Day 38: Resume Bullet Audit', desc: 'Final pass on all bullets. Ensure "Action + System + Impact" for new skills.', time: '1h', priority: 'medium', resources: [
    {label: 'Resume Verbs for Engineers', url: 'https://www.careercup.com/resume'}
  ]},
  { id: uid(), col: 'todo', subject: 'Branding', title: 'Day 39: LinkedIn Skills Audit', desc: 'Add newly learned skills: Helm, boto3, Multi-stage Docker, K8s RBAC.', time: '1h', priority: 'low', resources: [
    {label: 'LinkedIn Skills Optimization', url: 'https://www.linkedin.com/help/linkedin/answer/a511675/add-or-remove-skills-on-your-profile'}
  ]},
  { id: uid(), col: 'todo', subject: 'Job Search', title: 'Day 40: Outreach Sprint', desc: 'Apply to 5 high-fit Platform roles. Tailor headlines with your updated credentials.', time: '1h', priority: 'high', resources: [
    {label: 'LinkedIn Jobs: Platform Engineer', url: 'https://www.linkedin.com/jobs/search/?keywords=Platform%20Engineer'},
    {label: 'Levels.fyi: Salary Research', url: 'https://www.levels.fyi/'}
  ]}
];

// UI Helpers
function priorityClass(p) { return { high: 'priority-high', medium: 'priority-medium', low: 'priority-low' }[p] || 'priority-low'; }
function priorityLabel(p) { return { high: '🔴 High', medium: '🟡 Medium', low: '🟢 Low' }[p] || '🟢 Low'; }
function colLabel(c) { return { todo: 'To Study', inprogress: 'In Progress', review: 'Review', done: 'Done' }[c] || c; }
function tagClass(c) { return { todo: 'tag-todo', inprogress: 'tag-inprogress', review: 'tag-review', done: 'tag-done' }[c] || ''; }

// Storage - Updated Key to v5 for new resources
function saveCards(data) { localStorage.setItem('study-kanban-v5', JSON.stringify(data)); }
function loadCards() {
  try { const raw = localStorage.getItem('study-kanban-v5'); return raw ? JSON.parse(raw) : null; }
  catch { return null; }
}

let cards = loadCards() || [...SEED_CARDS];
let draggingId = null;
let editingId  = null;

const overlay      = document.getElementById('modalOverlay');
const modalTag     = document.getElementById('modalTag');
const modalTitle   = document.getElementById('modalTitle');
const modalSubject = document.getElementById('modalSubject');
const modalTime    = document.getElementById('modalTime');
const modalPriority= document.getElementById('modalPriority');
const modalCol     = document.getElementById('modalCol');
const modalDesc    = document.getElementById('modalDesc');
const resList      = document.getElementById('resourcesList');
const progressBar  = document.getElementById('progressBar');
const progressPct  = document.getElementById('progressPct');

document.getElementById('guidelinesToggle').addEventListener('click', () => {
  const body = document.getElementById('guidelinesBody');
  const chevron = document.getElementById('guidelinesChevron');
  const open = body.classList.toggle('open');
  chevron.classList.toggle('open', open);
});

function render() {
  COLS.forEach(col => {
    const container = document.getElementById(`cards-${col}`);
    const countEl   = document.getElementById(`count-${col}`);
    const colCards  = cards.filter(c => c.col === col);
    countEl.textContent = colCards.length;
    container.innerHTML = '';
    if (colCards.length === 0) container.innerHTML = `<div class="empty-col"><span>✦</span>No cards</div>`;

    colCards.forEach(card => {
      const el = document.createElement('div');
      el.className = 'card'; el.dataset.id = card.id; el.draggable = true;
      const linksHtml = (card.resources || []).slice(0, 3).map(r =>
        `<a class="card-link" href="${r.url}" target="_blank" rel="noopener">🔗 ${r.label}</a>`).join('');

      el.innerHTML = `
        <div class="card-subject">${card.subject}</div>
        <div class="card-title">${card.title}</div>
        ${card.desc ? `<div class="card-desc">${card.desc}</div>` : ''}
        ${linksHtml ? `<div class="card-links">${linksHtml}</div>` : ''}
        <div class="card-footer">
          <div class="card-time">${card.time ? '⏱ ' + card.time : ''}</div>
          <div class="card-priority ${priorityClass(card.priority)}">${priorityLabel(card.priority)}</div>
        </div>`;

      el.addEventListener('click', e => { if (e.target.closest('.card-link')) return; openModal(card.id); });
      el.addEventListener('dragstart', e => { draggingId = card.id; setTimeout(() => el.classList.add('dragging'), 0); });
      el.addEventListener('dragend', () => { el.classList.remove('dragging'); draggingId = null; });
      container.appendChild(el);
    });

    container.addEventListener('dragover', e => {
      e.preventDefault(); e.dataTransfer.dropEffect = 'move';
      let ph = document.querySelector('.drop-placeholder');
      const next = getDragAfterElement(container, e.clientY);
      if (!ph) { ph = document.createElement('div'); ph.className = 'drop-placeholder'; }
      if (next == null) container.appendChild(ph); else container.insertBefore(ph, next);
    });
    container.addEventListener('dragleave', e => { if (!container.contains(e.relatedTarget)) document.querySelectorAll('.drop-placeholder').forEach(p => p.remove()); });
    container.addEventListener('drop', e => {
      e.preventDefault(); document.querySelectorAll('.drop-placeholder').forEach(p => p.remove());
      if (!draggingId) return;
      const card = cards.find(c => c.id === draggingId);
      if (card) { card.col = col; saveCards(cards); render(); }
    });
  });
  updateProgress();
}

function getDragAfterElement(container, y) {
  return [...container.querySelectorAll('.card:not(.dragging)')].reduce((closest, el) => {
    const box = el.getBoundingClientRect(); const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) return { offset, el }; return closest;
  }, { offset: Number.NEGATIVE_INFINITY }).el;
}

function updateProgress() {
  const total = cards.length; const done = cards.filter(c => c.col === 'done').length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  progressBar.style.width = pct + '%'; progressPct.textContent = pct + '%';
}

function syncTag() { const c = modalCol.value; modalTag.className = `modal-tag ${tagClass(c)}`; modalTag.textContent = colLabel(c); }

function openModal(id) {
  editingId = id || null; const card = id ? cards.find(c => c.id === id) : null;
  modalTitle.value = card ? card.title : ''; modalSubject.value = card ? card.subject : '';
  modalTime.value = card ? card.time : ''; modalPriority.value = card ? card.priority : 'medium';
  modalCol.value = card ? card.col : 'todo'; modalDesc.value = card ? card.desc : '';
  syncTag(); renderResources(card ? (card.resources || []) : []); overlay.classList.add('open');
}

function closeModal() { overlay.classList.remove('open'); editingId = null; }
function renderResources(list) { resList.innerHTML = ''; list.forEach(r => addResourceRow(r.label, r.url)); }
function addResourceRow(label = '', url = '') {
  const row = document.createElement('div'); row.className = 'resource-item';
  row.innerHTML = `<input type="text" placeholder="Label" value="${label}" class="res-label" /><input type="url" placeholder="https://" value="${url}" class="res-url" /><button class="resource-remove">✕</button>`;
  row.querySelector('.resource-remove').addEventListener('click', () => row.remove()); resList.appendChild(row);
}
function collectResources() { return [...resList.querySelectorAll('.resource-item')].map(row => ({ label: row.querySelector('.res-label').value.trim(), url: row.querySelector('.res-url').value.trim() })).filter(r => r.label || r.url); }
function saveModal() {
  const data = { col: modalCol.value, title: modalTitle.value.trim(), subject: modalSubject.value.trim(), time: modalTime.value.trim(), priority: modalPriority.value, desc: modalDesc.value.trim(), resources: collectResources() };
  if (editingId) { const idx = cards.findIndex(c => c.id === editingId); if (idx !== -1) cards[idx] = { ...cards[idx], ...data }; }
  else { cards.push({ id: uid(), ...data }); }
  saveCards(cards); render(); closeModal();
}
function deleteCard() { if (editingId && confirm('Delete?')) { cards = cards.filter(c => c.id !== editingId); saveCards(cards); render(); closeModal(); } }

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('modalSave').addEventListener('click', saveModal);
document.getElementById('modalDelete').addEventListener('click', deleteCard);
document.getElementById('addResourceBtn').addEventListener('click', () => addResourceRow());
document.getElementById('globalAddBtn').addEventListener('click', () => openModal(null));
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
modalCol.addEventListener('change', syncTag);
document.querySelectorAll('.col-add-btn').forEach(btn => btn.addEventListener('click', () => { openModal(null); modalCol.value = btn.dataset.col; syncTag(); }));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); if ((e.metaKey || e.ctrlKey) && e.key === 'Enter' && overlay.classList.contains('open')) saveModal(); });

render();
