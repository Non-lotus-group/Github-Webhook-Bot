export type GithubEventType = 'issues' | 'issue_comment' | 'pull_request'
    | 'pull_request_review' | 'pull_request_review_comment' | 'push' | 'create'
    | 'delete' | 'repository' | 'release' | 'fork' | 'watch' | 'status' | 'member'
    | 'team_add' | 'page_build' | 'gollum' | 'project_card' | 'project_column'
    | 'project' | 'label' | 'milestone' | 'commit_comment' | 'installation' | 'installation_repositories'
    | 'integration_installation' | 'integration_installation_repositories' | 'meta'
    | 'organization' | 'public' | 'repository_dispatch' | 'repository_import'
    | 'repository_vulnerability_alert' | 'security_advisory' | 'sponsorship' | 'star' | 'workflow_dispatch' | 'workflow_run';

export const githubEventTypes: GithubEventType[] = [
    'issues', 'issue_comment', 'pull_request'
    , 'pull_request_review', 'pull_request_review_comment', 'push', 'create'
    , 'delete', 'repository', 'release', 'fork', 'watch', 'status', 'member'
    , 'team_add', 'page_build', 'gollum', 'project_card', 'project_column'
    , 'project', 'label', 'milestone', 'commit_comment', 'installation', 'installation_repositories'
    , 'integration_installation', 'integration_installation_repositories', 'meta'
    , 'organization', 'public', 'repository_dispatch', 'repository_import'
    , 'repository_vulnerability_alert', 'security_advisory', 'sponsorship', 'star', 'workflow_dispatch', 'workflow_run'];