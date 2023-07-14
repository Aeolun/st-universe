import { NotAcceptable } from "@tsed/exceptions";
import { Context, UsePipe } from "@tsed/platform-params";
import { AuthToken } from "src/models/auth-token";
import { universe } from "src/universe/universe";
import { JsonParameterStore, PipeMethods } from "@tsed/schema";
import { Injectable } from "@tsed/di";
import { useDecorators } from "@tsed/core";
import { STError } from "src/error/STError";
import {agentNotExistsError} from "src/universe/static-data/error-codes";

@Injectable()
export class AgentPipe implements PipeMethods {
  transform(value: AuthToken, metadata: JsonParameterStore) {
    const agent = universe.agents.find(
      (agent) => agent.symbol === value.identifier
    );
    if (!agent) {
      throw new STError(
        403,
        agentNotExistsError,
        `Agent ${value.identifier} does not exist`
      );
    }
    return agent;
  }
}

export function AgentParam(): ParameterDecorator {
  return useDecorators(Context("auth"), UsePipe(AgentPipe));
}
