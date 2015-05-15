
interface InfuserStatic {
    defaults: DefaultsStatic;
    storageOptions: StorageOptionsStatic;
    get(options, callback);
    getSync(options);
    infuse(templateId, renderOptions);
}

interface DefaultsStatic{
    templateUrl: string;
    templateSuffix: string;
    templatePrefix: string;
    ajax: any;
    target(templateId: string);
    loadingTemplate: any;
    postRender(targetElement);
    preRender(targetElement);
    render(target, template);
    bindingInstructions(template, model);
    useLoadingTemplate: boolean;
}

interface StorageOptionsStatic{
    hash: any;
    script: any
}

declare var infuser: InfuserStatic;