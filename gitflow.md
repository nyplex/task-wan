```mermaid
gitGraph
    commit id: "initial commit" type: HIGHLIGHT
    branch staging order: 2
    branch develop order: 3

    branch TKW-12 order: 4
    branch TKW-24 order: 5

    checkout TKW-12
    commit
    commit
    checkout develop
    merge TKW-12 id: "PR TKW-12"

    branch TKW-32 order: 6
    checkout TKW-32
    commit
    commit
    
    checkout TKW-24
    commit
    commit
    commit
    checkout develop
    merge TKW-24 id: "PR TKW-24"

    checkout develop 
    merge TKW-32 id: "PR TKW-32"

    checkout staging
    merge develop

    commit 
    commit

    checkout develop
    merge staging


    checkout main
    merge staging tag:"v1.0.0"
    
    checkout main
    branch TKW-50-HOTFIX order: 1
    commit
    commit

    checkout main
    merge TKW-50-HOTFIX tag: "HOTFIX-1.0.2"

    checkout staging
    merge TKW-50-HOTFIX

    checkout develop 
    merge TKW-50-HOTFIX

    checkout develop
    branch TKW-38 order: 8
    commit 
    commit
    commit
    checkout develop
    merge TKW-38

    checkout develop
    branch TKW-39 order: 9
    commit 
    commit 

    checkout main
    branch TKW-52-HOTFIX order: 1
    commit
    commit

    checkout main
    merge TKW-52-HOTFIX tag: "HOTFIX-1.0.2"

    checkout staging
    merge TKW-52-HOTFIX

    checkout develop 
    merge TKW-52-HOTFIX

    checkout develop
    branch TKW-40 order: 10
    commit 

    checkout TKW-38
    commit 

    checkout develop
    merge TKW-39

    checkout TKW-38
    commit
    commit 

    checkout develop
    merge TKW-38

    checkout TKW-40
    commit 

    checkout develop
    merge TKW-40

    checkout staging
    merge develop

    checkout main
    merge staging tag:"v.1.1.0"

    checkout develop
    branch TKW-41-OTA order: 10
    checkout TKW-41-OTA
    commit
    commit

    checkout develop
    merge TKW-41-OTA

    checkout staging
    merge TKW-41-OTA tag:"Label OTA"

    checkout main
    merge staging tag:"v.1.1.1-ota"