#!/usr/bin/env node
import {GithubApiService} from './GithubApiService';
import {User} from './User';
import {Repo} from './Repo'
import * as _ from 'lodash';
import argparser = require('commander');

let svc: GithubApiService = new GithubApiService();
argparser
    .version('1.0.0')
    .option('-u --user <username>','Github Username')
    .parse(process.argv);

if(!argparser.user) {
    console.log('error: option `-u --user <username>` argument missing');
    process.exit(1);
}
let username = argparser.user;
svc.getUserInfo(username, (user: User) => {
    svc.getRepos(username, (repos: Repo[]) => {
        let sortedRepos = _.sortBy(repos, [(repo: Repo) => repo.forkCount * -1]);
        let filteredRepos = _.take(sortedRepos, 5);
        user.repos = filteredRepos;
        console.log(user);
    });
});