#!/usr/bin/env node
"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var GithubApiService_1 = require("./GithubApiService");
var _ = __importStar(require("lodash"));
var argparser = require("commander");
var svc = new GithubApiService_1.GithubApiService();
argparser
    .version('1.0.0')
    .option('-u --user <username>', 'Github Username')
    .parse(process.argv);
if (!argparser.user) {
    console.log('error: option `-u --user <username>` argument missing');
    process.exit(1);
}
var username = argparser.user;
svc.getUserInfo(username, function (user) {
    svc.getRepos(username, function (repos) {
        var sortedRepos = _.sortBy(repos, [function (repo) { return repo.forkCount * -1; }]);
        var filteredRepos = _.take(sortedRepos, 5);
        user.repos = filteredRepos;
        console.log(user);
    });
});
